import React from "react"
import { PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import StaticPage from "@components/layout/StaticPage"
import FunnelThankyou from "@components/site/FunnelThankyou"
import { LocalizedPage } from "@context/locale-context/localized-page"

type ThankyouPageProps = PageProps<any, { locale: string }, { email?: string }>

const ThankyouPage: React.FC<ThankyouPageProps> = ({ pageContext, location }) => {
  const { locale } = pageContext

  return (
    <LocalizedPage locale={locale}>
      {(_, t) => {
        const email = location?.state?.email || "n.d."

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
