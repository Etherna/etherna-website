import { readItems } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { localeToLang } from "@/utils/data-parser"
import { parseSlug, routes } from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"

export async function fetchPageData(lang: Lang, path: string) {
  const slug = parseSlug(path)

  if (!slug) {
    throw new Error(`Slug not found, path: '${path}'`)
  }

  const pageTransltionResult = await directusClient
    .request(
      readItems("pages_translations", {
        fields: [
          "title",
          "slug",
          "content_text",
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

  if (!pageTransltionResult) {
    throw new Error(`Page not found, path: '${path}', lang: '${lang}'`)
  }

  const resultPage = pageTransltionResult.page_id as ExtractGeneric<
    typeof pageTransltionResult.page_id
  >

  const page = {
    title: pageTransltionResult.title,
    slug: pageTransltionResult.slug,
    contentText: pageTransltionResult.content_text,
    seo: pageTransltionResult.seo,
    locale: pageTransltionResult.locale,
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
