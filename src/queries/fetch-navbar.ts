import DirectusClient from "@/classes/DirectusClient"

import type { DocumentsNode, PageNode } from "@/schema/cms"

export default async function fetchNavbar(lang: string) {
  const client = new DirectusClient()
  const [{ data: pages }, { data: documents }] = await Promise.all([
    client.getItems<PageNode>("pages", {
      fields: [
        "show_in_menu",
        "localized_contents.title",
        "localized_contents.slug",
        "localized_contents.locale",
      ],
    }),
    client.getItems<DocumentsNode>("documents", {
      fields: ["whitepaper.private_hash", "whitepaper.filename_disk", "whitepaper.description"],
      single: true,
    }),
  ])

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
    documents: {
      whitepaper: documents.whitepaper?.private_hash
        ? client.getFileUrl(documents.whitepaper?.private_hash)
        : null,
    },
  }
}
