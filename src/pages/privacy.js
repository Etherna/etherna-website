import React, { useEffect } from "react"

import Layout from "@components/Layout"
import SEO from "@components/SEO"

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
    <Layout>
      <SEO title="Privacy Policy" />

      <div className="container">
        <div className="row">
          <div className="col pt-20 pb-40">
            <h1>Privacy Policy</h1>
            <a
              href="https://www.iubenda.com/privacy-policy/57423156"
              class="iubenda-white no-brand iubenda-embed iub-body-embed"
              title="Privacy Policy"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PrivacyPolicyPage
