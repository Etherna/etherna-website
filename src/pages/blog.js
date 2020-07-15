import React from "react"
import { graphql } from "gatsby"

import Layout from "@components/Layout"
import SEO from "@components/SEO"
import BlogPosts from "@components/BlogPosts"
import { LocalizedPage } from "@utils/localizedPage"
import { parsePosts, parseCategories } from "@utils/dataParser"
import { userLocale } from "@utils/lang"

const BlogPage = ({ data }) => {
  const locale = userLocale()
  const posts = parsePosts(data.posts.nodes, locale)
  const categories = parseCategories(data.categories.nodes, locale)
  return (
    <LocalizedPage>
      <Layout>
        <SEO title="Blog" />

        <BlogPosts
          title="Blog"
          posts={posts}
          categories={categories}
        />
      </Layout>
    </LocalizedPage>
  )
}

export const query = graphql`
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
          slug
          excerpt
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
                originalImg
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
      totalCount
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
`

export default BlogPage
