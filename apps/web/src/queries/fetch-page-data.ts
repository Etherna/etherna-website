import { readItems } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { localeToLang } from "@/utils/data-parser"
import { parseSlug, routes } from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"

export type ParsedPageData = Awaited<ReturnType<typeof fetchPageData>>
export type ParsedPage = ParsedPageData["page"]

export async function fetchPageData(lang: Lang, path: string) {
  const slug = parseSlug(path)

  if (!slug) {
    throw new Error(`Slug not found, path: '${path}'`)
  }

  const pageTranslationResult = await directusClient
    .request(
      readItems("pages_translations", {
        fields: [
          "title",
          "slug",
          "content_text",
          "description",
          "seo",
          "locale",
          {
            page_id: [
              "show_in_menu",
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

  if (!pageTranslationResult) {
    throw new Error(`Page not found, path: '${path}', lang: '${lang}'`)
  }

  const resultPage = pageTranslationResult.page_id as ExtractGeneric<
    typeof pageTranslationResult.page_id
  >

  const page = {
    title: pageTranslationResult.title,
    description: pageTranslationResult.description,
    slug: pageTranslationResult.slug,
    contentText: pageTranslationResult.content_text,
    seo: pageTranslationResult.seo,
    locale: pageTranslationResult.locale,
    showInMenu: resultPage.show_in_menu,
  }

  const localizedPaths = resultPage.translations
    .filter(t => localeToLang(t.locale) !== lang)
    .reduce<LocalizedPaths>(
      (acc, pageTranslation) => ({
        ...acc,
        [localeToLang(pageTranslation.locale)]: routes.pagePath(
          pageTranslation.slug,
          localeToLang(pageTranslation.locale)
        ),
      }),
      {}
    )

  return {
    page,
    localizedPaths,
  }
}
