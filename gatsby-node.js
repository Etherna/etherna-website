/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

///
/// Create custom pages for the blog
///
exports.createPages = async ({ actions, graphql }) => {
  const { data: { posts } } = await graphql(`
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
    }
  `)

  posts.nodes.forEach(node => {
    node.localized_contents.forEach(localizedPost => {
      const { slug, locale } = localizedPost
      actions.createPage({
        path: `blog/${slug}/`,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          slug,
          locale,
          avatar: node.author.avatar
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
