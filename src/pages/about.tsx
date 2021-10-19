import React, { useRef } from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import StaticPage from "@components/layout/StaticPage"
import Team from "@components/site/Team"
import { LocalizedPage } from "@context/locale-context/localized-page"
import { TeamMemberNode } from "@definitions/sources"
import routes from "@utils/routes"
import { parseTeam } from "@utils/dataParser"

type AboutPageProps = PageProps<{
  team: {
    nodes: TeamMemberNode[]
  }
}, {
  locale: string
}>

const AboutPage: React.FC<AboutPageProps> = ({ data, pageContext }) => {
  const { locale } = pageContext
  const team = parseTeam(data.team.nodes, locale)

  const localePathsSet = useRef(false)

  return (
    <LocalizedPage locale={locale}>
      {(localeContext, t) => {
        if (localeContext && !localePathsSet.current) {
          localePathsSet.current = true

          // Define localized paths
          localeContext[1].setLocalePath("en", routes.aboutPath("en"))
          localeContext[1].setLocalePath("it", routes.aboutPath("it"))
        }

        return (
          <Layout>
            <HeadMeta title={t`header.about`} />

            <StaticPage title={t`header.about`}>
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
      localized_contents {
        bio
        role
        locale
      }
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

export default AboutPage
