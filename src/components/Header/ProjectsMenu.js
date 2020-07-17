import React from "react"
import classnames from "classnames"
import { Link, useStaticQuery, graphql } from "gatsby"

import DropDown from "@components/common/DropDown"
import { useLocale } from "@utils/localizedPage"
import routes from "@utils/routes"
import { parseProjects } from "@utils/dataParser"

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
            meta_description
          }
        }
      }
    }
  `)
  const projects = parseProjects(data.projects.nodes)
  const activeProjects = projects.filter(p => !p.coming_soon)
  const comingSoonProjects = projects.filter(p => p.coming_soon)
  const [locale] = useLocale()

  console.log(projects);

  return (
    <DropDown
      toggleClass={classnames(
        "header-link",
        "projects-toggle"
      )}
      toggleChildren="Projects"
      showChevron={true}
    >
      <nav className="projects-menu">
        <div className="projects-menu-row">
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
            <h6 className="project-soon-label">Coming later!</h6>
            <div className="projects-menu-row">
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

  return (
    <div
      className={classnames("projects-menu-item", {
        "disabled": project.coming_soon
      })}
    >
        <div className="projects-menu-item-image">
          <Link to={path}>
            {project.image && (
              <img src={project.image.localFile.publicURL} alt={project.title} />
            )}
          </Link>
        </div>
        <div className="projects-menu-item-info">
          <Link to={path}>
            <div className="project-title">{project.title}</div>
            <p className="project-description">{project.meta_description}</p>
          </Link>
        </div>
    </div>
  )
}

export default ProjectsMenu
