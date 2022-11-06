import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import StaticPage from "@components/layout/StaticPage"
import BrandKit from "@components/site/BrandKit"
import { LocalizedPage } from "@context/locale-context/localized-page"
import { ColorNode, FontNode, LogoNode } from "@definitions/sources"

type BlogPageProps = PageProps<{
  brand: {
    colors: ColorNode[]
    fonts: FontNode[]
    logos: LogoNode[]
  }
}, {
  locale: string
}>

const BrandKitPage: React.FC<BlogPageProps> = ({ data, pageContext }) => {
  const { locale } = pageContext
  const { colors, fonts, logos } = data.brand

  return (
    <LocalizedPage locale={locale}>
      <Layout>
        <HeadMeta title="Blog" />

        <StaticPage title={`Brand Kit`}>
          <BrandKit
            colors={colors}
            fonts={fonts}
            logos={logos}
          />
        </StaticPage>
      </Layout>
    </LocalizedPage>
  )
}

export const query = graphql`
  query {
    brand: directusBrand {
      colors {
        color
        name
      }
      fonts {
        name
        font_family
        font_weight
        import_url
        font_link
      }
      logos {
        name
        logo_variants {
          style
          variant_name
          image {
            localFile {
              publicURL
            }
          }
        }
      }
    }
  }
`

export default BrandKitPage
