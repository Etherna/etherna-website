import React from "react"
import classnames from "classnames"
import { Link, useStaticQuery, graphql } from "gatsby"

import DropDown from "@components/common/DropDown"
import { useLocale } from "@utils/localizedPage"
import routes from "@utils/routes"
import { parseProjects } from "@utils/dataParser"
import { useTranslations } from "@utils/useTranslations"

const ProjectsMenu = () => {
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
  const trans = useTranslations(locale, "header")
  const projects = parseProjects(data.projects.nodes, locale)
  const activeProjects = projects.filter(p => !p.coming_soon)
  const comingSoonProjects = projects.filter(p => p.coming_soon)

  return (
    <DropDown
      toggleClass={classnames(
        "header-link",
        "mega-toggle"
      )}
      toggleChildren={trans("projects")}
      showChevron={true}
    >
      <nav className="mega-menu">
        <div className="mega-menu-row">
          {activeProjects.map((project, i) => (
            <ProjectMenuItem
              project={project}
              locale={locale}
              key={i}
            />
          ))}
        </div>
        {comingSoonProjects.length > 0 && (
          <>
            <h6 className="mega-soon-label">
              {trans("comingLater")} <span role="img" aria-label="waiting for launch">🚀</span>
            </h6>
            <div className="mega-menu-row">
              {comingSoonProjects.map((project, i) => (
                <ProjectMenuItem
                  project={project}
                  locale={locale}
                  key={i}
                />
              ))}
            </div>
          </>
        )}
      </nav>
    </DropDown>
  )
}

const ProjectMenuItem = ({ project, locale }) => {
  const path = project.coming_soon
    ? null
    : routes.projectPath(project.slug, locale)

  const LinkWrapper = ({ children }) => path ? (
    <Link to={path}>{children}</Link>
  ) : (
    <>{children}</>
  )

  return (
    <div
      className={classnames("mega-menu-item", {
        "disabled": project.coming_soon
      })}
    >
      <div className="mega-menu-item-image">
        <LinkWrapper>
          {project.image && (
            <img src={project.image.localFile.publicURL} alt={project.title} />
          )}
        </LinkWrapper>
      </div>
      <div className="mega-menu-item-info">
        <LinkWrapper>
          <div className="mega-title">{project.title}</div>
          <p className="mega-description">{project.excerpt}</p>
        </LinkWrapper>
      </div>
    </div>
  )
}

export default ProjectsMenu
