import React, { useEffect } from "react"

import Layout from "@components/Layout"
import SEO from "@components/SEO"
import { LocalizedPage } from "@utils/localizedPage"
import StaticPage from "@components/StaticPage"

const PrivacyPolicyPage = () => {
  useEffect(() => {
    const iubendaScript = document.createElement("script")
    iubendaScript.src = "https://cdn.iubenda.com/iubenda.js"

    const tag = document.getElementsByTagName("script")[0]
    tag.parentNode.insertBefore(iubendaScript, tag)

    return () => {
      iubendaScript.remove()
    }
  }, [])

  return (
    <LocalizedPage>
      <Layout>
        <SEO title="Privacy Policy" />

        <StaticPage title={`Privacy Policy`}>
          <a
            href="https://www.iubenda.com/privacy-policy/57423156"
            className="iubenda-white no-brand iubenda-embed iub-body-embed"
            title="Privacy Policy"
          >
            Privacy Policy
          </a>
        </StaticPage>
      </Layout>
    </LocalizedPage>
  )
}

export default PrivacyPolicyPage
