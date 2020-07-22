# gatsby-plugin-swarm

Adds support for deploying [Gatsby](https://www.gatsbyjs.org/) websites to [Swarm](https://ethersphere.github.io/swarm-home/) and [IPFS](https://ipfs.io/) by ensuring that assets are relative.

This plugin is inspired by [gatsby-plugin-ipfs](https://github.com/moxystudio/gatsby-plugin-ipfs/).


## Usage

Set `prefixPath` to an arbitrary string (eg: `__PATH_PREFIX__`) and include the plugin in your `gatsby-config.js` file.
 - Also make sure to add the option `prefix` set equal to the pathPrefix.
 - The option `pattern` should match the swarm/ipfs path prefix

```js
module.exports = {
  pathPrefix: '__PATH_PREFIX__',
  plugins: [
    {
      resolve: `gatsby-plugin-swarm`,
      options: {
        prefix: `__PATH_PREFIX__`,
        pattern: /^(\/bzz:\/[^/]+)/ // use /^(\/(?:ipfs|ipns)\/[^/]+)/ for IPFS
      },
    },
  ],
};
```
