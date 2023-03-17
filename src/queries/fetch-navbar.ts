import DirectusClient from "@/classes/DirectusClient"

import type { PageNode } from "@/schema/cms"

export default async function fetchNavbar(lang: string) {
  const client = new DirectusClient()
  const { data: pages } = await client.getItems<PageNode>("pages", {
    fields: [
      "show_in_menu",
      "localized_contents.title",
      "localized_contents.slug",
      "localized_contents.locale",
    ],
  })

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
  }
}
