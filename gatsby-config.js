const path = require("path")
const stringHash = require("string-hash")

// Enable local .env configuration
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: process.argv.includes(`--prefix-paths`) && `__PATH_PREFIX__`,
  siteMetadata: {
    title: `Etherna`,
    description: `Etherna is a transparent video platform, made for freedom.
      We believe in freedom of speech and we won't ban any content as long as it's legal.
      Join us and let's stop censorship together.`,
    tagline: `Eyes Wide Open`,
    author: `Mattia Dalzocchio`,
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    {
      resolve: "@directus/gatsby-source-directus",
      options: {
        url: process.env.DIRECTUS_URL,
        project: process.env.DIRECTUS_PROJECT,
        auth: {
          token: process.env.DIRECTUS_TOKEN
        },
        /**
         * Optional - set the status of the items you want to receive. E.g. if you functionality
         * want to receive items with status 'published'.
         * `targetStatus` sets the status you want the items to have. `defaultStatus`
         * defines a fallback status that will also be accepted (e.g. you want
         * items with status 'draft', but 'published' is also acceptable)
         *
         */
        targetStatus: ["published", "__NONE__"]
      },
    },
    {
      resolve: `gatsby-plugin-runtime-path-prefix`,
      options: {
        prefix: `__PATH_PREFIX__`,
        pattern: /^(\/bzz\/[^/]+)/,
        forceTrailingSlash: true,
        useBasename: true
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: [`DIRECTUS_URL`, `DIRECTUS_PROJECT`]
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-async`
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: [`/admin`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `translations`,
        path: `${__dirname}/src/lang`,
      },
    },
    {
      resolve: `gatsby-transformer-json`,
    },
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        svgo: false,
        svgoConfig: {
          plugins: [
            { name: "removeViewBox", removeViewBox: false },
            { name: "cleanupIDs", cleanupIDs: false },
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-image`
    },
    {
      resolve: `gatsby-transformer-sharp`
    },
    {
      resolve: `gatsby-plugin-sharp`
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Etherna`,
        short_name: `Etherna`,
        start_url: `/`,
        background_color: `#f7fafc`,
        theme_color: `#00AABE`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          modules: {
            namedExport: false,
            getLocalIdent: (context, localIdentName, localName, options) => {
              if (localName === "dark") return "dark"

              const basename = path.basename(context.resourcePath).replace(/\.module\.scss/, "")
              const hash = stringHash(localName).toString(36).substr(0, 5)

              return process.env.NODE_ENV === "production"
                ? `_${basename}_${hash}`
                : `_${basename}_${localName}_${hash}`
            }
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: "1",
        matomoUrl: "https://analytics.etherna.io",
        siteUrl: "https://etherna.io/",
        disableCookies: true,
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
