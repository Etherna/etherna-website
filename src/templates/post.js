import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "@components/Layout"
import SEO from "@components/SEO"
import BlogPost from "@components/BlogPost"
import { LocalizedPage } from "@utils/localizedPage"
import { parsePostData, parseFluidImage } from "@utils/dataParser"

const PostPage = ({ data, pageContext }) => {
  let post = parsePostData(data.post, pageContext.locale)
  post.author.avatar = parseFluidImage(data.authorAvatar)

  return (
    <LocalizedPage>
      <Layout transparentHeader={true}>
        <SEO
          title={post.title}
          description={post.meta_description || post.excerpt}
          keywords={post.meta_keywords}
        />

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
  query($slug: String!, $avatar: Int!) {
    post: directusPost(localized_contents: {elemMatch: {slug: {eq: $slug}}}) {
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
        excerpt
        meta_description
        meta_keywords
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
    },
    authorAvatar: directusFile(directusId: {eq: $avatar}) {
      localFile {
        childImageSharp {
          fluid(maxWidth: 128) {
            aspectRatio
            base64
            presentationHeight
            presentationWidth
            sizes
            src
            srcSet
          }
        }
      }
    }
  }
`

export default PostPage
