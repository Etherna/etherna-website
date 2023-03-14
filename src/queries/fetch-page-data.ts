import DirectusClient from "@/classes/DirectusClient"
import { parsePage } from "@/utils/dataParser"
import routes, { parseSlug } from "@/utils/routes"

import type { PageNode } from "@/definitions/sources"
import type { Lang, LocalizedPaths } from "@/utils/lang"

export default async function fetchPageData(lang: Lang, path: string) {
  const slug = parseSlug(path)
  const client = new DirectusClient()
  const pages = await client.getItems<PageNode>("pages", {
    fields: [
      "show_in_menu",
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

  const pageLangs = pages.map(page => page.localized_contents.map(lc => lc.locale)).flat()
  const parsedPages = await Promise.all(pageLangs.map(lang => parsePage(pages[0]!, lang)))
  const page = parsedPages.find(page => page.locale === lang)

  if (!page) {
    throw new Error("Page not found")
  }

  const localizedPaths: LocalizedPaths = parsedPages
    .filter(p => p.locale !== lang)
    .reduce(
      (acc, page) => ({
        ...acc,
        [page.locale]: routes.pagePath(page.slug, page.locale as Lang),
      }),
      {}
    )

  return {
    page,
    localizedPaths,
  }
}
