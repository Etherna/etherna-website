// Enable .env configuration
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: '__PATH_PREFIX__',
  //pathPrefix: '/bzz:/test/',
  siteMetadata: {
    title: `Etherna`,
    description: `Etherna is a transparent video platform, made for freedom. We believe in freedom of speech and we won't ban any content as long as it's legal. Join us and let's stop censorship together.`,
    tagline: `A transparent video platform for content creators.`,
    author: `Mattia Dalzocchio`,
  },
  plugins: [
    {
      resolve: "@directus/gatsby-source-directus",
      options: {
        url: process.env.DIRECTUS_URL,
        project: process.env.DIRECTUS_PROJECT,
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
      resolve: `gatsby-plugin-swarm`,
      options: {
        prefix: `__PATH_PREFIX__`,
        pattern: /^(\/bzz:\/[^/]+)/,
        forceTrailingSlash: true,
        useBasename: true
      },
    },
    `gatsby-plugin-react-helmet`,
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `/images/svg`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#f7fafc`,
        theme_color: `#37C4A5`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`./tailwind.config.js`),
          require(`autoprefixer`),
        ],
      },
  },
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
  ],
}
