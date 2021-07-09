import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import HeadMeta from "@components/HeadMeta"
import Layout from "@components/Layout"
import Page from "@components/Page"
import { LocalizedPage } from "@utils/localizedPage"
import { parsePage } from "@utils/dataParser"

const PageTemplate = ({ data, pageContext }) => {
  const { locale } = pageContext
  const page = parsePage(data.page, pageContext.locale)

  console.log('page', page);

  return (
    <LocalizedPage locale={locale}>
      <HeadMeta
        title={page.title}
        description={page.meta_description}
        keywords={page.meta_keywords}
      />

      <Layout>
        <Page
          page={page}
        />
      </Layout>
    </LocalizedPage>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
}

export const query = graphql`
  query ($slug: String!, $locale: String!) {
    page: directusPage(
      localized_contents: {elemMatch: {slug: {eq: $slug}, locale: {eq: $locale}}}
    ) {
      localized_contents {
        meta_description
        meta_keywords
        locale
        content
        title
        slug
      }
    }
  }
`

export default PageTemplate
