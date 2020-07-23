const {
  injectScriptsInHtmlFiles,
  relativizeHtmlFiles,
  relativizeJsContentFiles,
  relativizeMiscAssetFiles
} = require("./src/path-fixers")

exports.onPostBuild = async (nodeOptions) => {
  const { store, reporter } = nodeOptions
  const { config, program } = store.getState()
  const plugin = config.plugins.find(plugin => ("resolve" in plugin) && plugin.resolve === "gatsby-plugin-swarm")
  const { options } = plugin
  const { prefix, pattern, forceTrailingSlash, useBasename } = options

  if (!prefix || prefix === "") {
    reporter.panic(`You must set the prefix option in your gatsby-config.js file`)
  }

  if (!pattern || pattern === "") {
    reporter.panic(`You must set the pattern option in your gatsby-config.js file`)
  }

  if (program.prefixPaths) {
    await relativizeHtmlFiles(prefix, forceTrailingSlash)
    await relativizeMiscAssetFiles(prefix)
    await relativizeJsContentFiles(prefix)
    await injectScriptsInHtmlFiles(prefix, pattern, forceTrailingSlash, useBasename)
  }
}
