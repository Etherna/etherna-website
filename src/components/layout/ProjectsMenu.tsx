import { useTranslation } from "react-i18next"

import MegaMenu from "./MegaMenu"
import MegaMenuItem from "./MegaMenuItem"
import routes from "@/utils/routes"

import type { Project } from "@/schema/app"
import type { Lang } from "@/utils/lang"

type ProjectsMenuProps = {
  projects: Project[]
  toggleClassName?: string
  lang: Lang
}

const ProjectsMenu: React.FC<ProjectsMenuProps> = ({ projects, toggleClassName, lang }) => {
  const { t } = useTranslation("header")
  const activeProjects = projects.filter(p => !p.coming_soon)
  const comingSoonProjects = projects.filter(p => p.coming_soon)

  return (
    <MegaMenu.Menu toggleRender={t("projects")} toggleClassName={toggleClassName}>
      <MegaMenu.Row>
        {activeProjects.map((project, i) => (
          <MegaMenuItem
            href={project.external_link ?? routes.projectPath(project.slug, lang)}
            title={project.title}
            excerpt={project.excerpt || undefined}
            image={project.image}
            isExternal={!!project.external_link}
            key={i}
          />
        ))}
      </MegaMenu.Row>

      {comingSoonProjects.length > 0 && (
        <>
          <h6 className="mt-6 pl-3 text-sm font-semibold text-gray-700 opacity-50">
            {t`comingLater`}{" "}
            <span role="img" aria-label="waiting for launch">
              🚀
            </span>
          </h6>
          <MegaMenu.Row>
            {comingSoonProjects.map((project, i) => (
              <MegaMenuItem
                title={project.title}
                excerpt={project.excerpt || undefined}
                image={project.image}
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
