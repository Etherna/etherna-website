/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { DEFAULT_LOCALE, SUPPORTED_LOCALES } = require("./src/utils/lang")

///
/// Add localized pages
///
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const pageCopy = {...page}

  if (page.path === "/blog/" || page.path === "/") {
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
        },
      })
    })
  }
}

///
/// Create custom pages for the blog
///
exports.createPages = async ({ actions, graphql }) => {
  const { data: { posts, categories } } = await graphql(`
    query {
      posts: allDirectusPost(filter: {published_on: {ne: null}}) {
        nodes {
          author {
            first_name
            avatar
            last_name
          }
          localized_contents {
            title
            locale
            content
            slug
          }
          category: category_id {
            localized_contents {
              locale
              name
              slug
            }
          }
          status
          published_on
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 800) {
                  aspectRatio
                  base64
                  src
                  srcSet
                  sizes
                  presentationHeight
                  presentationWidth
                }
              }
            }
          }
        }
      }
      categories: allDirectusCategory {
        nodes {
          localized_contents {
            slug
            name
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
          slug,
          locale,
          avatar: node.author.avatar
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
          locale
        }
      })
    })
  })
}


///
/// Webpack extension
///
const path = require("path")
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@images": path.resolve(__dirname, "src/images"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
  })
}
