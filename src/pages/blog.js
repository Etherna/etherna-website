import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "@components/Layout"
import SEO from "@components/SEO"
import Blog from "@components/Blog"
import { LocalizedPage } from "@utils/localizedPage"
import { parsePosts } from "@utils/dataParser"

const BlogPage = ({ data, pageContext }) => {
  const { locale } = pageContext
  const posts = parsePosts(data.posts.nodes, locale)

  return (
    <LocalizedPage locale={locale}>
      <Layout>
        <SEO title="Blog" />

        <Blog
          posts={posts}
          locale={locale}
        />
      </Layout>
    </LocalizedPage>
  )
}

export const query = graphql`
  query($locale:String!, $now:Date!) {
    posts: allDirectusPost(
      filter: {
        published_on: {lte: $now},
        localized_contents: {elemMatch: {locale: {eq: $locale}}}
      }
    ) {
      nodes {
        author {
          first_name
          avatar
          last_name
        }
        localized_contents {
          title
          slug
          excerpt
          locale
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
  }
`

BlogPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
}

export default BlogPage
