import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { LocalizedPage } from "@utils/localizedPage"
import Layout from "@components/Layout"
import HeadMeta from "@components/HeadMeta"
import StaticPage from "@components/StaticPage"
import Team from "@components/Team"

const AboutPage = ({ data, pageContext }) => {
  const { locale } = pageContext
  const team = data.team.nodes

  return (
    <LocalizedPage locale={locale}>
      <Layout>
        <HeadMeta title="About us" />

        <StaticPage title="About us">
          <Team team={team} />
        </StaticPage>
      </Layout>
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
