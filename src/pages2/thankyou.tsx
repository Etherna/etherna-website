import React from "react"
import HeadMeta from "@components/layout/HeadMeta"
import Layout from "@components/layout/Layout"
import StaticPage from "@components/layout/StaticPage"
import { LocalizedPage } from "@context/locale-context/localized-page"
import type { PageProps } from "gatsby"

import FunnelThankyou from "@/components/site/FunnelThankyou"

import HeadMeta from "@components/layout/HeadMeta"

type ThankyouPageProps = PageProps<any, { locale: string }, { email?: string }>

const ThankyouPage: React.FC<ThankyouPageProps> = ({ pageContext, location }) => {
  const { locale } = pageContext

  return (
    <LocalizedPage locale={locale}>
      {(_, t) => {
        return (
          <Layout>
            <HeadMeta title={t`funnel.thankYou`} />
            <StaticPage title={t`funnel.thankYou`}>
              <FunnelThankyou />
            </StaticPage>
          </Layout>
        )
      }}
    </LocalizedPage>
  )
}

export default ThankyouPage
