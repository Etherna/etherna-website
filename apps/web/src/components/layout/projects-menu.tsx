import { useTranslation } from "react-i18next"

import { MegaMenu, MegaMenuRow } from "./mega-menu"
import { MegaMenuItem } from "./mega-menu-item"
import { routes } from "@/utils/routes"

import type { Project } from "@/schema/app"
import type { Lang } from "@/utils/lang"

interface ProjectsMenuProps {
  projects: Project[]
  toggleClassName?: string
  lang: Lang
}

export function ProjectsMenu({ projects, toggleClassName, lang }: ProjectsMenuProps) {
  const { t } = useTranslation("header")
  const activeProjects = projects.filter(p => !p.coming_soon)
  const comingSoonProjects = projects.filter(p => p.coming_soon)

  return (
    <MegaMenu toggleRender={t("projects")} toggleClassName={toggleClassName}>
      <MegaMenuRow>
        {activeProjects.map(project => (
          <MegaMenuItem
            key={project.slug}
            href={project.external_link ?? routes.projectPath(project.slug, lang)}
            title={project.title}
            excerpt={project.excerpt || undefined}
            image={project.image}
            isExternal={!!project.external_link}
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
                excerpt={project.excerpt || undefined}
                image={project.image}
                disabled
              />
            ))}
          </MegaMenuRow>
        </>
      )}
    </MegaMenu>
  )
}
