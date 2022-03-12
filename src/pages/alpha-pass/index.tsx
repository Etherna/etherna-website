import React from "react"
import { PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import StaticPage from "@components/layout/StaticPage"
import { LocalizedPage } from "@context/locale-context/localized-page"
import AlphaPass from "@components/site/AlphaPass"

type AlphaPassPageProps = PageProps<any, { locale: string }>

const AlphaPassPage: React.FC<AlphaPassPageProps> = ({ pageContext }) => {
  const { locale } = pageContext

  return (
    <LocalizedPage locale={locale}>
      {(_, t) => {
        return (
          <Layout>
            <HeadMeta title={t`alphapass.requestAlphaPass`} />

            <StaticPage title={t`alphapass.requestAlphaPass`}>
              <AlphaPass />
            </StaticPage>
          </Layout>
        )
      }}
    </LocalizedPage>
  )
}

export default AlphaPassPage
