import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "@components/layout/Layout"
import HeadMeta from "@components/layout/HeadMeta"
import Project from "@components/site/Project"
import { LocalizedPage } from "@context/locale-context/localized-page"
import { ProjectNode } from "@definitions/sources"
import { parseProject } from "@utils/dataParser"

type PageTemplateProps = PageProps<{
  project: ProjectNode
}, {
  locale: string
}>
const ProjectPage: React.FC<PageTemplateProps> = ({ data, pageContext }) => {
  const { locale } = pageContext
  const project = parseProject(data.project, pageContext.locale)

  return (
    <LocalizedPage locale={locale}>
      <HeadMeta
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
