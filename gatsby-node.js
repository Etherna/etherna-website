/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { DEFAULT_LOCALE, SUPPORTED_LOCALES } = require("./src/utils/lang")


///
/// Add localized pages
///
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const pageCopy = { ...page }

  const localizedRoutes = [
    "/",
    "/blog/"
  ]

  if (localizedRoutes.indexOf(page.path) >= 0) {
    // Delete default page and re-create with locale context
    deletePage(page)

    // Create pages in all supperted locales
    SUPPORTED_LOCALES.forEach(locale => {
      const path = locale === DEFAULT_LOCALE
        ? pageCopy.path
        : `/${locale}${pageCopy.path}`

      createPage({
        ...pageCopy,
        path,
        context: {
          ...pageCopy.context,
          locale,
          now: (new Date()).toISOString()
        },
      })
    })
  }
}

///
/// Create custom pages for:
///   - blog
///   - projects
///
exports.createPages = async ({ actions, graphql }) => {
  const now = (new Date()).toISOString()
  const { data: { posts, categories, projects, pages } } = await graphql(`
    query {
      posts: allDirectusPost(filter: {published_on: {lte: "${now}"}}) {
        nodes {
          author {
            avatar
          }
          localized_contents {
            locale
            slug
          }
        }
      }
      categories: allDirectusCategory {
        nodes {
          localized_contents {
            slug
            locale
          }
        }
      }
      projects: allDirectusProject(filter: {coming_soon: {eq: false}}) {
        nodes {
          localized_contents {
            slug
            locale
          }
        }
      }
      pages: allDirectusPage {
        nodes {
          localized_contents {
            slug
            locale
          }
        }
      }
    }
  `)

  posts.nodes.forEach(node => {
    node.localized_contents.forEach(localizedPost => {
      const { slug, locale } = localizedPost
      const pagePath = locale === DEFAULT_LOCALE
        ? `/blog/${slug}/`
        : `/${locale}/blog/${slug}/`

      actions.createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          post: node,
          slug,
          locale,
          now,
        }
      })
    })
  })
  categories.nodes.forEach(node => {
    node.localized_contents.forEach(localizedCategory => {
      const { slug, locale } = localizedCategory
      const pagePath = locale === DEFAULT_LOCALE
        ? `/blog/category/${slug}/`
        : `/${locale}/blog/category/${slug}/`

      actions.createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/category.js`),
        context: {
          slug,
          locale,
          now,
        }
      })
    })
  })
  projects.nodes.forEach(node => {
    node.localized_contents.forEach(localizedProject => {
      const { slug, locale } = localizedProject
      const pagePath = locale === DEFAULT_LOCALE
        ? `/project/${slug}/`
        : `/${locale}/project/${slug}/`

      actions.createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/project.js`),
        context: {
          slug,
          locale
        }
      })
    })
  })
  pages.nodes.forEach(node => {
    node.localized_contents.forEach(localizedProject => {
      const { slug, locale } = localizedProject
      const pagePath = locale === DEFAULT_LOCALE
        ? `/${slug}/`
        : `/${locale}/${slug}/`

      actions.createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/page.js`),
        context: {
          slug,
          locale
        }
      })
    })
  })
}


///
/// Webpack extension
///
exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@images": path.resolve(__dirname, "src/images"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
  })

  if (getConfig().mode === "production") {
    if (process.env.DISABLE_SOURCEMAP === "true") {
      actions.setWebpackConfig({
        devtool: false
      })
    }
  }
}
