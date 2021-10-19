import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import Blog from "@components/blog/Blog"
import { LocalizedPage } from "@context/locale-context/localized-page"
import { PostNode } from "@definitions/sources"
import { parsePosts } from "@utils/dataParser"

type BlogPageProps = PageProps<{
  posts: {
    nodes: PostNode[]
  }
}, {
  locale: string
}>

const BlogPage: React.FC<BlogPageProps> = ({ data, pageContext }) => {
  const { locale } = pageContext
  const posts = parsePosts(data.posts.nodes, locale)

  return (
    <LocalizedPage locale={locale}>
      <Layout>
        <HeadMeta title="Blog" />

        <Blog posts={posts} />
      </Layout>
    </LocalizedPage>
  )
}

export const query = graphql`query ($locale: String!, $now: Date!) {
  posts: allDirectusPost(
    filter: {localized_contents: {elemMatch: {locale: {eq: $locale}}}, published_on: {lte: $now}}
    sort: {order: DESC, fields: published_on}
  ) {
    nodes {
      directusId
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
    totalCount
  }
}
`

export default BlogPage
