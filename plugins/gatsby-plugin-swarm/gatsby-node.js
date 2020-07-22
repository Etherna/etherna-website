const {
  injectScriptsInHtmlFiles,
  relativizeHtmlFiles,
  relativizeJsFiles,
  relativizeMiscAssetFiles
} = require("./src/path-fixers")

exports.onPostBuild = async (nodeOptions) => {
  const { store, reporter } = nodeOptions
  const { config, program } = store.getState()
  const plugin = config.plugins.find(plugin => ("resolve" in plugin) && plugin.resolve === "gatsby-plugin-swarm")
  const { options: { prefix, pattern } } = plugin

  if (!prefix || prefix === "") {
    reporter.panic(`You must set the prefix option in your gatsby-config.js file`)
  }

  if (!pattern || pattern === "") {
    reporter.panic(`You must set the pattern option in your gatsby-config.js file`)
  }

  if (program.prefixPaths) {
    await relativizeHtmlFiles(prefix)
    await relativizeJsFiles(prefix)
    await relativizeMiscAssetFiles(prefix)
    await injectScriptsInHtmlFiles(prefix, pattern)
  }
}
