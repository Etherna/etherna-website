import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "@components/Layout"
import BlogPost from "@components/BlogPost"
import { LocalizedPage } from "@utils/localizedPage"
import { parsePost, parseFluidImage } from "@utils/dataParser"

const PostPage = ({ data, pageContext }) => {
  const { locale } = pageContext

  let post = parsePost(data.post, locale)
  post.author.avatar = parseFluidImage(data.authorAvatar)

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
    avatar: PropTypes.number.isRequired,
  }).isRequired,
}

export const query = graphql`
  query($slug: String!, $avatar: Int!) {
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
