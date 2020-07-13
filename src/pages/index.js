import React from "react"

import Layout from "@components/Layout"
import SEO from "@components/SEO"
import Hero from "@components/Hero"
import Landing from "@components/Landing"
import { LocalizedPage } from "@utils/localizedPage"

const IndexPage = () => (
  <LocalizedPage>
    <Layout transparentHeader={true}>
      <SEO title="Etherna" />

      <Hero />
      <Landing />
    </Layout>
  </LocalizedPage>
)

export default IndexPage
