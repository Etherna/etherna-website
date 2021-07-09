import React from "react"
import PropTypes from "prop-types"

import Layout from "@components/Layout"
import HeadMeta from "@components/HeadMeta"
import Hero from "@components/Hero"
import Landing from "@components/Landing"
import { LocalizedPage } from "@utils/localizedPage"

const IndexPage = ({ pageContext }) => (
  <LocalizedPage locale={pageContext.locale}>
    <Layout transparentHeader={true} showLandingMenu={true}>
      {/* eslint-ignore-next-line react/jsx-pascal-case */}
      <HeadMeta title="Etherna" />

      <Hero />
      <Landing />
    </Layout>
  </LocalizedPage>
)

IndexPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
}

export default IndexPage
