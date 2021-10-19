import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import BlogPost from "@components/blog/BlogPost"
import { LocalizedPage } from "@context/locale-context/localized-page"
import { PostNode } from "@definitions/sources"
import { parsePost } from "@utils/dataParser"

type PostPageProps = PageProps<{
  post: PostNode
}, {
  locale: string
}>

const PostPage: React.FC<PostPageProps> = ({ data, pageContext }) => {
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

export const query = graphql`query ($slug: String!) {
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
          gatsbyImageData(
            width: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            layout: CONSTRAINED
          )
        }
      }
    }
  }
}
`

export default PostPage
