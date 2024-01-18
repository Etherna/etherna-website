import { readItems } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { localeToLang } from "@/utils/data-parser"
import { parseSlug, routes } from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"

export async function fetchProjectData(lang: Lang, path: string) {
  const slug = parseSlug(path)

  if (!slug) {
    throw new Error(`Slug not found, path: '${path}'`)
  }

  const projectTranslationResult = await directusClient
    .request(
      readItems("projects_translations", {
        fields: [
          "title",
          "slug",
          "content",
          "seo",
          "locale",
          {
            project_id: [
              "github_link",
              "external_link",
              "coming_soon",
              {
                image: ["id", "width", "height", "type", "title"],
              },
              {
                translations: ["slug", "locale"],
              },
            ],
          },
        ],
        filter: {
          _and: [
            {
              slug: {
                _eq: slug,
              },
            },
            {
              locale: {
                _starts_with: lang as Locale,
              },
            },
          ],
        },
        limit: 1,
      })
    )
    .then(res => res[0])

  if (!projectTranslationResult) {
    throw new Error("Project not found")
  }

  const resultProject = projectTranslationResult.project_id as ExtractGeneric<
    typeof projectTranslationResult.project_id
  >

  const project = {
    title: projectTranslationResult.title,
    slug: projectTranslationResult.slug,
    content: projectTranslationResult.content,
    seo: projectTranslationResult.seo,
    locale: projectTranslationResult.locale,
    githubLink: resultProject.github_link,
    externalLink: resultProject.external_link,
    comingSoon: resultProject.coming_soon,
  }

  const localizedPaths = resultProject.translations
    .filter(t => localeToLang(t.locale) !== lang)
    .reduce<LocalizedPaths>(
      (acc, projectTranslation) => ({
        ...acc,
        [localeToLang(projectTranslation.locale)]: routes.pagePath(
          projectTranslation.slug,
          localeToLang(projectTranslation.locale)
        ),
      }),
      {}
    )

  return {
    project,
    localizedPaths,
  }
}
