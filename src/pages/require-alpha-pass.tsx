import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import routes from "@utils/routes"

const RequireAlphaPassPage: React.FC = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  useEffect(() => {
    const url = `${site.siteMetadata.siteUrl}${routes.alphaPassPath("")}`
    window.location.href = url
  }, [site.siteMetadata.siteUrl])

  return null
}

export default RequireAlphaPassPage
