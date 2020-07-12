import React from "react"

import Layout from "@components/Layout"
import SEO from "@components/SEO"
import Hero from "@components/Hero"
import Landing from "@components/Landing"

const IndexPage = () => (
  <Layout transparentHeader={true}>
    <SEO title="Etherna" />

    <Hero />

    <Landing />
  </Layout>
)

export default IndexPage
