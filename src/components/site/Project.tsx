import React, { useEffect } from "react"

import classes from "@styles/components/site/Project.module.scss"
import { ReactComponent as GitHubLogo } from "@images/logos/github-logo.svg"

import Markdown from "@components/common/Markdown"
import Prose from "@components/common/Prose"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import { Project as ProjectModel } from "@definitions/app"
import routes from "@utils/routes"

type ProjectProps = {
  project: ProjectModel
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  const [locale, { setLocalePath }] = useLocale()
  const { t } = useTranslations(locale, "project")

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
          <Prose className={classes.project}>
            <article>
              <header className={classes.projectHeader}>
                <div className={classes.projectGithub}>
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      className="text-sm text-gray-800 hover:text-black ml-auto"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubLogo className="inline-block" height="16" />
                      {t`viewOnGithub`}
                    </a>
                  )}
                </div>
                <div className={classes.projectImage}>
                  {project.image && (
                    <img
                      src={project.image.localFile.publicURL}
                      alt={project.title}
                    />
                  )}
                </div>
              </header>

              <h1>{project.title}</h1>

              <Markdown rawMarkdown={project.content} />
            </article>
          </Prose>
        </div>
      </div>
    </div>
  )
}

export default Project
