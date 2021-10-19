import React from "react"
import { PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import Hero from "@components/landing/Hero"
import Landing from "@components/landing/Landing"
import { LocalizedPage } from "@context/locale-context/localized-page"

type IndexPageProps = PageProps<any, {
  locale: string
}>

const IndexPage: React.FC<IndexPageProps> = ({ pageContext }) => (
  <LocalizedPage locale={pageContext.locale}>
    <Layout transparentHeader={true} showLandingMenu={true}>
      <HeadMeta title="Etherna" />

      <Hero />
      <Landing />
    </Layout>
  </LocalizedPage>
)

export default IndexPage
