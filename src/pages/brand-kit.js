import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { LocalizedPage } from "@utils/localizedPage"
import Layout from "@components/Layout"
import HeadMeta from "@components/HeadMeta"

import BrandKit from "@components/BrandKit"
import StaticPage from "@components/StaticPage"

const BrandKitPage = ({ data, pageContext }) => {
  const { locale } = pageContext
  const { colors, fonts, logos } = data.brand

  return (
    <LocalizedPage locale={locale}>
      <Layout>
        {/* eslint-ignore-next-line react/jsx-pascal-case */}
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

BrandKitPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
}

export default BrandKitPage
