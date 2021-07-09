import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Markdown } from "react-showdown"

import GitHubLogo from "!svg-react-loader!@images/logos/github-logo.svg"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"
import routes from "@utils/routes"

import "./project.scss"

/**
 * @typedef ProjectProps
 * @property {import("@utils/dataParser").Project} project
 *
 * @param {ProjectProps} param0
 */
const Project = ({ project }) => {
  const [locale, { setLocalePath }] = useLocale()
  const trans = useTranslations(locale, "project")

  useEffect(() => {
    setLocalePaths()
    return () => clearLocalePaths()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocalePaths = () => {
    project.allSlugs.forEach(info => {
      setLocalePath(info.locale, routes.projectPath(info.slug, info.locale))
    })
  }

  const clearLocalePaths = () => {
    project.allSlugs.forEach(info => {
      setLocalePath(info.locale, undefined)
    })
  }
  return (
    <div className="container py-8">
      <div className="row">
        <div className="col">
          <div className="post post-project">
            <article className="post-content">
              <header className="post-project-header">
                <div className="post-github">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      className="text-sm text-gray-800 hover:text-black ml-auto"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubLogo className="inline-block" height="16" />
                      {trans("viewOnGithub")}
                    </a>
                  )}
                </div>
                <div className="post-image">
                  {project.image && (
                    <img
                      src={project.image.localFile.publicURL}
                      alt={project.title}
                    />
                  )}
                </div>
              </header>

              <h1>{project.title}</h1>

              <Markdown markdown={project.content} />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

Project.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
}


export default Project
