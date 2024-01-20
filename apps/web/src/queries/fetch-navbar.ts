import { readItems } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { findTranslation, getExternalAsset } from "@/utils/data-parser"

import type { Lang } from "@/utils/lang"

export type ParsedNavbarData = Awaited<ReturnType<typeof fetchNavbar>>

export async function fetchNavbar(lang: Lang) {
  const [pagesResult, whitepaperResult] = await Promise.all([
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
    directusClient
      .request(
        readItems("documents", {
          fields: [
            "name",
            {
              file_id: ["id", "type"],
            },
          ],
          filter: {
            code: {
              _eq: "whitepaper",
            },
          },
        })
      )
      .then(res => res[0]),
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
  const documents = {
    whitepaper: whitepaperResult?.file_id
      ? await getExternalAsset(whitepaperResult.file_id.id, whitepaperResult.name)
      : null,
  }

  return {
    pages,
    documents,
  }
}
