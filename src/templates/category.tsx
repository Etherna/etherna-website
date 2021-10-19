import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import BlogCategory from "@components/blog/BlogCategory"
import { LocalizedPage } from "@context/locale-context/localized-page"
import { CategoryNode, PostNode } from "@definitions/sources"
import { parseCategory, parsePosts } from "@utils/dataParser"

type CategoryPageProps = PageProps<{
  category: CategoryNode
  posts: {
    nodes: PostNode[]
  }
}, {
  locale: string
}>

const CategoryPage: React.FC<CategoryPageProps> = ({ data, pageContext }) => {
  const { locale } = pageContext
  const category = parseCategory(data.category, locale)
  const posts = parsePosts(data.posts.nodes, locale)

  return (
    <LocalizedPage locale={locale}>
      <Layout>
        <BlogCategory
          category={category}
          posts={posts}
        />
      </Layout>
    </LocalizedPage>
  )
}

export const query = graphql`query ($locale: String!, $slug: String!, $now: Date!) {
  category: directusCategory(
    localized_contents: {elemMatch: {slug: {eq: $slug}, locale: {eq: $locale}}}
  ) {
    localized_contents {
      name
      locale
      slug
    }
  }
  posts: allDirectusPost(
    filter: {
      category: {localized_contents: {elemMatch: {slug: {eq: $slug}}}}
      published_on: {lte: $now}
      localized_contents: {elemMatch: {locale: {eq: $locale}}}
    }
  ) {
    nodes {
      directusId
      published_on
      author {
        avatar
        first_name
        last_name
      }
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
          slug
          name
          locale
        }
      }
    }
    totalCount
  }
}
`

export default CategoryPage
