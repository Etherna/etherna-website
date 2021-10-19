import React, { useEffect } from "react"
import { PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import StaticPage from "@components/layout/StaticPage"
import { LocalizedPage } from "@context/locale-context/localized-page"

type PrivacyPolicyPageProps = PageProps<any, {
  locale: string
}>

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = () => {
  useEffect(() => {
    const iubendaScript = document.createElement("script")
    iubendaScript.src = "https://cdn.iubenda.com/iubenda.js"

    const tag = document.getElementsByTagName("script")[0]
    tag.parentNode!.insertBefore(iubendaScript, tag)

    return () => {
      iubendaScript.remove()
    }
  }, [])

  return (
    <LocalizedPage>
      <Layout>
        <HeadMeta title="Privacy Policy" />

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
