import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "@components/Layout"
import Project from "@components/Project"
import { LocalizedPage } from "@utils/localizedPage"
import { parseProject } from "@utils/dataParser"
import SEO from "@components/SEO"

const ProjectPage = ({ data, pageContext }) => {
  const { locale } = pageContext
  const project = parseProject(data.project, pageContext.locale)

  return (
    <LocalizedPage locale={locale}>
      <SEO
        title={project.title}
        description={project.meta_description}
        keywords={project.meta_keywords}
      />

      <Layout>
        <Project
          project={project}
        />
      </Layout>
    </LocalizedPage>
  )
}

ProjectPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
}

export const query = graphql`
  query ($slug: String!, $locale: String!) {
    project: directusProject(
      localized_contents: {elemMatch: {slug: {eq: $slug}, locale: {eq: $locale}}}
    ) {
      github_link
      coming_soon
      image {
        localFile {
          publicURL
        }
      }
      localized_contents {
        meta_description
        meta_keywords
        locale
        content
        title
        slug
      }
    }
  }
`

export default ProjectPage
