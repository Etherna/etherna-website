import DirectusClient from "@/classes/DirectusClient"

import type { PageNode, ProjectNode } from "@/definitions/sources"

export default async function fetchFooter(lang: string) {
  const client = new DirectusClient()
  const [pages, projects] = await Promise.all([
    client.getItems<PageNode>("pages", {
      fields: [
        "show_in_menu",
        "localized_contents.title",
        "localized_contents.slug",
        "localized_contents.locale",
      ],
    }),
    client.getItems<ProjectNode>("projects", {
      fields: ["localized_contents.title", "localized_contents.slug", "localized_contents.locale"],
    }),
  ])

  console.log(pages, projects, lang)

  const footerPages = pages
    .filter(p => p.show_in_menu)
    .map(p => p.localized_contents.find(lc => lc.locale === lang))
    .filter(Boolean)
    .map(p => ({
      title: p.title,
      slug: p.slug,
    }))
  const footerProjects = projects
    .map(p => p.localized_contents.find(lc => lc.locale === lang))
    .filter(Boolean)
    .map(p => ({
      title: p.title,
      slug: p.slug,
    }))

  return {
    pages: footerPages,
    projects: footerProjects,
  }
}
