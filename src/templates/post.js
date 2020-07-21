import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "@components/Layout"
import BlogPost from "@components/BlogPost"
import { LocalizedPage } from "@utils/localizedPage"
import { parsePost } from "@utils/dataParser"

const PostPage = ({ data, pageContext }) => {
  const { locale } = pageContext
  const post = parsePost(data.post, locale)

  return (
    <LocalizedPage locale={locale}>
      <Layout transparentHeader={true}>
        <BlogPost
          post={post}
        />
      </Layout>
    </LocalizedPage>
  )
}

PostPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
}

export const query = graphql`
  query($slug: String!) {
    post: directusPost(localized_contents: {elemMatch: {slug: {eq: $slug}}}) {
      directusId
      author {
        first_name
        avatar
        last_name
      }
      localized_contents {
        title
        slug
        content
        excerpt
        meta_description
        meta_keywords
        locale
      }
      category {
        localized_contents {
          locale
          name
          slug
        }
      }
      status
      updated_on
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
  }
`

export default PostPage
