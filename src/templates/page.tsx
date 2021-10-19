import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import Page from "@components/site/Page"
import { LocalizedPage } from "@context/locale-context/localized-page"
import { PageNode } from "@definitions/sources"
import { parsePage } from "@utils/dataParser"

type PageTemplateProps = PageProps<{
  page: PageNode
}, {
  locale: string
}>

const PageTemplate: React.FC<PageTemplateProps> = ({ data, pageContext }) => {
  const { locale } = pageContext
  const page = parsePage(data.page, pageContext.locale)

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
        excerpt
      }
    }
  }
`

export default PageTemplate
