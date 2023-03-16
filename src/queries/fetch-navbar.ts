import DirectusClient from "@/classes/DirectusClient"
import { parseFluidImage } from "@/utils/dataParser"

import type { LocaleNode, PageNode } from "@/definitions/sources"

export default async function fetchNavbar(lang: string) {
  const client = new DirectusClient()
  const [{ data: locales }, { data: pages }] = await Promise.all([
    client.getItems<LocaleNode>("locales", {
      fields: [
        "code",
        "name",
        "flag.private_hash",
        "flag.filename_disk",
        "flag.width",
        "flag.height",
        "flag.description",
      ],
    }),
    client.getItems<PageNode>("pages", {
      fields: [
        "show_in_menu",
        "localized_contents.title",
        "localized_contents.slug",
        "localized_contents.locale",
      ],
    }),
  ])

  const navbarLocales = await Promise.all(
    locales.map(async l => ({
      code: l.code,
      name: l.name,
      flag: (await parseFluidImage(l.flag, l.name))!,
    }))
  )

  const navbarPages = pages
    .filter(p => p.show_in_menu)
    .map(p => p.localized_contents.find(lc => lc.locale === lang))
    .filter(Boolean)
    .map(p => ({
      title: p.title,
      slug: p.slug,
    }))

  return {
    pages: navbarPages,
    locales: navbarLocales,
  }
}
