import DirectusClient from "@/classes/DirectusClient"
import { parseProject } from "@/utils/dataParser"
import routes, { parseSlug } from "@/utils/routes"

import type { ProjectNode } from "@/definitions/sources"
import type { Lang, LocalizedPaths } from "@/utils/lang"

export default async function fetchProjectData(lang: Lang, path: string) {
  const slug = parseSlug(path)
  const client = new DirectusClient()
  const { data: projects } = await client.getItems<ProjectNode>("projects", {
    fields: [
      "github_link",
      "external_link",
      "status",
      "image.private_hash",
      "image.filename_disk",
      "image.width",
      "image.height",
      "image.description",
      "localized_contents.title",
      "localized_contents.slug",
      "localized_contents.content",
      "localized_contents.excerpt",
      "localized_contents.meta_description",
      "localized_contents.locale",
    ],
    filter: {
      "localized_contents.slug": {
        eq: slug,
      },
    },
  })

  const projectLangs = projects
    .map(project => project.localized_contents.map(lc => lc.locale))
    .flat()
  const parsedProjects = await Promise.all(
    projectLangs.map(lang => parseProject(projects[0]!, lang))
  )
  const project = parsedProjects.find(project => project.locale === lang)

  if (!project) {
    throw new Error("Project not found")
  }

  const localizedPaths: LocalizedPaths = parsedProjects
    .filter(p => p.locale !== lang)
    .reduce(
      (acc, project) => ({
        ...acc,
        [project.locale]: routes.projectPath(project.slug, project.locale as Lang),
      }),
      {}
    )

  return {
    project,
    localizedPaths,
  }
}
