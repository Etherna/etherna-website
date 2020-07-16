import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "@components/Layout"
import BlogCategory from "@components/BlogCategory"
import { LocalizedPage } from "@utils/localizedPage"
import { parseCategory, parsePosts } from "@utils/dataParser"

const CategoryPage = ({ data, pageContext }) => {
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

CategoryPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
}

export const query = graphql`
  query($slug:String!, $now:Date!, $locale:String!) {
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
        category_id: {localized_contents: {elemMatch: {slug: {eq: $slug}}}},
        published_on: {lte: $now},
        localized_contents: {elemMatch: {locale: {eq: $locale}}}
      }
    ) {
      nodes {
        published_on
        author {
          avatar
          first_name
          last_name
        }
        image {
          localFile {
            childImageSharp {
              fluid {
                aspectRatio
                base64
                originalImg
                presentationHeight
                presentationWidth
                sizes
                src
                srcSet
              }
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
        category_id {
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
