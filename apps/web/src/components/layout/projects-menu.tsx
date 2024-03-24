import { useTranslation } from "react-i18next"

import { MegaMenu, MegaMenuRow } from "./mega-menu"
import { MegaMenuItem } from "./mega-menu-item"
import { routes } from "@/utils/routes"

import type { ParsedProject } from "@/queries/fetch-project-data"
import type { Lang } from "@/utils/lang"

interface ProjectsMenuProps {
  projects: ParsedProject[]
  toggleClassName?: string
  lang: Lang
}

export function ProjectsMenu({ projects, toggleClassName, lang }: ProjectsMenuProps) {
  const { t } = useTranslation("header")
  const activeProjects = projects.filter(p => !p.comingSoon)
  const comingSoonProjects = projects.filter(p => p.comingSoon)

  return (
    <MegaMenu toggleRender={t("projects")} toggleClassName={toggleClassName}>
      <MegaMenuRow>
        {activeProjects.map(project => (
          <MegaMenuItem
            key={project.slug}
            href={project.externalLink ?? routes.projectPath(project.slug, lang)}
            title={project.title}
            image={undefined}
            isExternal={!!project.externalLink}
          />
        ))}
      </MegaMenuRow>

      {comingSoonProjects.length > 0 && (
        <>
          <h6 className="mt-6 pl-3 text-sm font-semibold text-gray-700 opacity-50">
            {t`comingLater`}{" "}
            <span role="img" aria-label="waiting for launch">
              🚀
            </span>
          </h6>
          <MegaMenuRow>
            {comingSoonProjects.map(project => (
              <MegaMenuItem
                key={project.slug}
                title={project.title}
                excerpt={undefined}
                image={undefined}
                disabled
              />
            ))}
          </MegaMenuRow>
        </>
      )}
    </MegaMenu>
  )
}
