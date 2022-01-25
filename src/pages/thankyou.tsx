import React from "react"
import { PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import StaticPage from "@components/layout/StaticPage"
import { LocalizedPage } from "@context/locale-context/localized-page"
import FunnelThankyou from "@components/site/FunnelThankyou"

type ThankyouPageProps = PageProps<any, { locale: string }>

const ThankyouPage: React.FC<ThankyouPageProps> = ({ pageContext }) => {
  const { locale } = pageContext

  return (
    <LocalizedPage locale={locale}>
      {(_, t) => {
        let email: string | null = null
        if (typeof (window || URLSearchParams) !== "undefined") {
          email = new URLSearchParams(location.search).get("e")
        }

        return (
          <Layout>
            <HeadMeta title={t`funnel.thankYou`} />
            <StaticPage title={t`funnel.thankYou`}>
              <FunnelThankyou email={email} />
            </StaticPage>
          </Layout>
        )
      }}
    </LocalizedPage>
  )
}

export default ThankyouPage
