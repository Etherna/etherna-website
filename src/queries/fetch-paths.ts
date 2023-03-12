import DirectusClient from "@/classes/DirectusClient"
import { DEFAULT_LOCALE } from "@/utils/lang"
import routes from "@/utils/routes"

import type { PageNode } from "@/definitions/sources"

export const StaticPaths = [
  // home
  { params: { lang: "en", path: "/" } },
  { params: { lang: "it", path: "/" } },
  // about
  { params: { lang: "en", path: "/about" } },
  { params: { lang: "it", path: "/chi-siamo" } },
  // blog
  { params: { lang: "en", path: "/blog" } },
  { params: { lang: "it", path: "/blog" } },
  // brand kit
  { params: { lang: "en", path: "/brand-kit" } },
  { params: { lang: "it", path: "/brand-kit" } },
]

export const withoutLocale = (path: string, locale: string) => {
  return path.replace(new RegExp(`^/?${locale}/`), "/")
}

export default async function fetchPaths() {
  const client = new DirectusClient()
  const [pages, projects, posts, categories] = await Promise.all([
    client.getItems<PageNode>("pages", {
      fields: ["localized_contents.slug", "localized_contents.locale"],
    }),
    client.getItems<PageNode>("projects", {
      fields: ["localized_contents.slug", "localized_contents.locale"],
    }),
    client.getItems<PageNode>("posts", {
      fields: ["localized_contents.slug", "localized_contents.locale"],
    }),
    client.getItems<PageNode>("categories", {
      fields: ["localized_contents.slug", "localized_contents.locale"],
    }),
  ])

  const dynamicPaths = [
    ...pages
      .map(page => page.localized_contents)
      .flat()
      .map(page => ({
        params: {
          lang: page.locale,
          path: withoutLocale(routes.pagePath(page.slug, page.locale), page.locale),
        },
      })),
    ...projects
      .map(project => project.localized_contents)
      .flat()
      .map(project => ({
        params: {
          lang: project.locale,
          path: withoutLocale(routes.projectPath(project.slug, project.locale), project.locale),
        },
      })),
    ...posts
      .map(post => post.localized_contents)
      .flat()
      .map(post => ({
        params: {
          lang: post.locale,
          path: withoutLocale(routes.blogPostPath(post.slug, post.locale), post.locale),
        },
      })),
    ...categories
      .map(category => category.localized_contents)
      .flat()
      .map(category => ({
        params: {
          lang: category.locale,
          path: withoutLocale(
            routes.blogCategoryPath(category.slug, category.locale),
            category.locale
          ),
        },
      })),
  ]

  const paths = StaticPaths.concat(dynamicPaths).map(({ params: { lang, path } }) => ({
    params: {
      path: path !== "/" ? path : undefined,
      lang: lang !== DEFAULT_LOCALE ? lang : undefined,
    },
  }))

  return paths
}
