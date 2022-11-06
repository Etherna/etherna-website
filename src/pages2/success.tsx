import React from "react"
import { PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import StaticPage from "@components/layout/StaticPage"
import { LocalizedPage } from "@context/locale-context/localized-page"
import FunnelSuccess from "@components/site/FunnelSuccess"

type SuccessPageProps = PageProps<any, { locale: string }>

const SuccessPage: React.FC<SuccessPageProps> = ({ pageContext }) => {
  const { locale } = pageContext

  return (
    <LocalizedPage locale={locale}>
      {(_, t) => {
        return (
          <Layout>
            <HeadMeta title={t`funnel.success`} />

            <StaticPage title={t`funnel.success`}>
              <FunnelSuccess message={t`funnel.registrationConfirmed`} />
            </StaticPage>
          </Layout>
        )
      }}
    </LocalizedPage>
  )
}

export default SuccessPage
