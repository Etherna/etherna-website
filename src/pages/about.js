import React, { useRef } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { LocalizedPage } from "@utils/localizedPage"
import Layout from "@components/Layout"
import HeadMeta from "@components/HeadMeta"
import StaticPage from "@components/StaticPage"
import Team from "@components/Team"
import routes from "@utils/routes"

const AboutPage = ({ data, pageContext }) => {
  const { locale } = pageContext
  const team = data.team.nodes

  const localePathsSet = useRef(false)

  return (
    <LocalizedPage locale={locale}>
      {(localeContext) => {
        if (localeContext && !localePathsSet.current) {
          localePathsSet.current = true

          // Define localized paths
          localeContext[1].setLocalePath("en", routes.aboutPath("en"))
          localeContext[1].setLocalePath("it", routes.aboutPath("it"))
        }

        return (
          <Layout>
            <HeadMeta title="About us" />

            <StaticPage title="About us">
              <Team team={team} />
            </StaticPage>
          </Layout>
        )
      }}
    </LocalizedPage>
  )
}

export const query = graphql`{
  team: allDirectusTeam {
    nodes {
      name
      role
      bio
      photo {
        localFile {
          childImageSharp {
            gatsbyImageData (
              width: 800
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
}
`

AboutPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
}

export default AboutPage
