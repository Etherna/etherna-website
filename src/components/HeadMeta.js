import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import { useLocale } from "@utils/localizedPage"

const HeadMeta = ({ title, description, keywords, lang, meta }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            tagline
          }
        }
      }
    `
  )
  const [locale] = useLocale()

  const metaDescription = description || site.siteMetadata.description
  const tagline = title === site.siteMetadata.title
    ? site.siteMetadata.tagline
    : site.siteMetadata.title

  return (
    <Helmet
      htmlAttributes={{
        lang: lang || locale,
      }}
      title={title}
      titleTemplate={`%s – ${tagline}`}
      link={[
        {
          href: `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap`,
          rel: `stylesheet`
        },
        {
          href: `https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap`,
          rel: `stylesheet`
        }
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `google-site-verification`,
          content: `4MV0zRqX0r9mX0e4jz5j-D0h5_N6oPQNWEh1fON5M3A`,
        },
      ].concat(meta)}
    />
  )
}

HeadMeta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
}

HeadMeta.defaultProps = {
  meta: [],
  description: ``,
}

export default HeadMeta
