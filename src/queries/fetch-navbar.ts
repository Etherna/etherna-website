import { getImage } from "@astrojs/image"

import DirectusClient from "@/classes/DirectusClient"

import type { LocaleNode, PageNode } from "@/definitions/sources"

export default async function fetchNavbar(lang: string) {
  const client = new DirectusClient()
  const [locales, pages] = await Promise.all([
    client.getItems<LocaleNode>("locales", {
      fields: ["code", "name", "flag.private_hash"],
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
      flag: await getImage({
        src: client.getFileUrl(l.flag.private_hash),
        width: 100,
        height: 100,
        alt: l.name,
        format: "svg",
      }),
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
