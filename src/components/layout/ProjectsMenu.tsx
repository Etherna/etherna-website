import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import classes from "@styles/components/layout/ProjectsMenu.module.scss"

import MegaMenu from "./MegaMenu"
import MegaMenuItem from "./MegaMenuItem"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import { parseProjects } from "@utils/dataParser"
import routes from "@utils/routes"

type ProjectsMenuProps = {
  toggleClassName?: string
}

const ProjectsMenu: React.FC<ProjectsMenuProps> = ({ toggleClassName }) => {
  const data = useStaticQuery(graphql`
    query {
      projects: allDirectusProject {
        nodes {
          coming_soon
          image {
            localFile {
              publicURL
            }
          }
          localized_contents {
            title
            slug
            locale
            excerpt
          }
        }
      }
    }
  `)
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "header")
  const projects = parseProjects(data.projects.nodes, locale)
  const activeProjects = projects.filter(p => !p.coming_soon)
  const comingSoonProjects = projects.filter(p => p.coming_soon)

  return (
    <MegaMenu.Menu toggleRender={t`projects`} toggleClassName={toggleClassName}>
      <MegaMenu.Row>
        {activeProjects.map((project, i) => (
          <MegaMenuItem
            to={routes.projectPath(project.slug, locale)}
            title={project.title}
            excerpt={project.excerpt || undefined}
            imageUrl={project.image?.localFile.publicURL}
            key={i}
          />
        ))}
      </MegaMenu.Row>

      {comingSoonProjects.length > 0 && (
        <>
          <h6 className={classes.soonLabel}>
            {t`comingLater`} <span role="img" aria-label="waiting for launch">🚀</span>
          </h6>
          <MegaMenu.Row>
            {comingSoonProjects.map((project, i) => (
              <MegaMenuItem
                title={project.title}
                excerpt={project.excerpt || undefined}
                imageUrl={project.image?.localFile.publicURL}
                disabled
                key={i}
              />
            ))}
          </MegaMenu.Row>
        </>
      )}
    </MegaMenu.Menu>
  )
}

export default ProjectsMenu
