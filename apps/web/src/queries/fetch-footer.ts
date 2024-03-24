import { readItems } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { findTranslation } from "@/utils/data-parser"

import type { Lang } from "@/utils/lang"

export type ParsedFooterData = Awaited<ReturnType<typeof fetchFooter>>

export async function fetchFooter(lang: Lang) {
  const [pagesResult, projectsResult] = await Promise.all([
    directusClient.request(
      readItems("pages", {
        fields: [
          "show_in_menu",
          {
            translations: ["title", "slug", "locale"],
          },
        ],
      })
    ),
    directusClient.request(
      readItems("projects", {
        fields: [
          "external_link",
          {
            translations: ["title", "slug", "locale"],
          },
        ],
      })
    ),
  ])

  const pages = pagesResult.map(res => {
    const translation = findTranslation(res.translations ?? [], lang)
    return {
      showInMenu: res.show_in_menu,
      title: translation.title,
      slug: translation.slug,
      locale: translation.locale,
    }
  })
  const projects = projectsResult.map(res => {
    const translation = findTranslation(res.translations ?? [], lang)
    return {
      externalLink: res.external_link,
      title: translation.title,
      slug: translation.slug,
      locale: translation.locale,
    }
  })

  return {
    pages,
    projects,
  }
}
