const fs = require('fs')
const path = require('path')
const util = require('util')
const pMap = require('p-map')
const globby = require('globby')
const isTextPath = require('is-text-path')
const UglifyJS = require("uglify-js")
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

const TRANSFORM_CONCURRENCY = 10

/**
 * Get the relative path based on path depth
 *
 * @param {string} path Assets path
 * @returns {string}
 */
const getRelativePrefix = path => {
  const depth = path.split('/').length - 2
  const relativePrefix = depth > 0 ? '../'.repeat(depth) : './'
  return relativePrefix
}

/**
 * Replace all the path prefix strings with the correct
 * relative paths inside the HTML files.
 *
 * @param {string} prefix Path prefix to replace
 */
const relativizeHtmlFiles = async prefix => {
  const paths = await globby(['public/**/*.html'])

  await pMap(paths, async path => {
    const buffer = await readFileAsync(path)
    let contents = buffer.toString()

    // Skip if there's nothing to do
    if (!contents.includes(prefix)) {
      return
    }

    const relativePrefix = getRelativePrefix(path)
    const pattern = new RegExp(`\/${prefix}\/`, "g")

    contents = contents.replace(pattern, relativePrefix)

    await writeFileAsync(path, contents)
  }, {
    concurrency: TRANSFORM_CONCURRENCY
  })
}


/**
 * Replace all the path prefix strings with the global variable
 * named as the path prefix
 *
 * @param {string} prefix Path prefix to replace
 */
const relativizeJsFiles = async prefix => {
  const paths = await globby(['public/**/*.js'])

  await pMap(paths, async path => {
    const buffer = await readFileAsync(path)
    let contents = buffer.toString()

    // Skip if there's nothing to do
    if (!contents.includes(prefix)) {
      return
    }

    const pattern1 = new RegExp(`["']\/${prefix}['"]`, "g")
    const pattern2 = new RegExp(`(["'])\/${prefix}\/([^'"]*?)(['"])`, "g")

    contents = contents
      .replace(pattern1, ` ${prefix} `)
      .replace(pattern2, (matches, g1, g2, g3) => ` ${prefix} + ${g1}/${g2}${g3}`)

    contents = `if(typeof ${prefix} === 'undefined'){${prefix}=''}${contents}`

    await writeFileAsync(path, contents)
  }, {
    concurrency: TRANSFORM_CONCURRENCY
  })
}

/**
 * Replace all the path prefix strings with the correct
 * relative paths inside the HTML and JS files.
 *
 * @param {string} prefix Path prefix to replace
 */
const relativizeMiscAssetFiles = async prefix => {
  const paths = await globby(['public/**/*', '!public/**/*.html', '!public/**/*.js'])

  await pMap(paths, async path => {
    // Skip if this is not a text file
    if (!isTextPath(path)) {
      return
    }

    const buffer = await readFileAsync(path)
    let contents = buffer.toString()

    // Skip if there's nothing to do
    if (!contents.includes(prefix)) {
      return
    }

    const relativePrefix = getRelativePrefix(path)
    const pattern = new RegExp(`\/${prefix}\/`, "g")

    contents = contents.replace(pattern, relativePrefix)

    await writeFileAsync(path, contents)
  }, {
    concurrency: TRANSFORM_CONCURRENCY
  })
}

/**
 * Inject a JS file that sets a global variable
 * with the path prefix name
 *
 * @param {string} prefix Path prefix to set
 * @param {string} pattern Regex pattern that matches the swarm/ipfs prefix
 */
const injectScriptsInHtmlFiles = async (prefix, pattern) => {
  const scriptBuffer = await readFileAsync(path.resolve(__dirname, 'runtime/head-prefix.js'))
  const scriptContents = UglifyJS.minify(
    scriptBuffer.toString()
      .replace(/__PATH_PREFIX__/g, prefix)
      .replace(/__PATTERN__/g, pattern)
  ).code

  const paths = await globby(['public/**/*.html'])

  await pMap(paths, async (path) => {
      let contents = await readFileAsync(path)

      contents = contents
        .toString()
        .replace(/<head>/, `<head><script>${scriptContents}</script>`)

      await writeFileAsync(path, contents)
  }, {
    concurrency: TRANSFORM_CONCURRENCY
  })
}

exports.relativizeHtmlFiles = relativizeHtmlFiles
exports.relativizeJsFiles = relativizeJsFiles
exports.relativizeMiscAssetFiles = relativizeMiscAssetFiles
exports.injectScriptsInHtmlFiles = injectScriptsInHtmlFiles
