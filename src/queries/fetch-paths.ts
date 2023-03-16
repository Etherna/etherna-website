import DirectusClient from "@/classes/DirectusClient"
import { DEFAULT_LOCALE } from "@/utils/lang"
import routes, { withPagination } from "@/utils/routes"

import type { CategoryNode, PageNode, PostNode, ProjectNode } from "@/definitions/sources"
import type { Lang } from "@/utils/lang"

export const PAGINATION_LIMIT = import.meta.env.DEV ? 2 : 20

export const StaticPaths = [
  // home
  { params: { lang: "en", path: "/" } },
  { params: { lang: "it", path: "/" } },
  // about
  { params: { lang: "en", path: "/about" } },
  { params: { lang: "it", path: "/chi-siamo" } },
  // brand kit
  { params: { lang: "en", path: "/brand-kit" } },
  { params: { lang: "it", path: "/brand-kit" } },
]

export const withoutLocale = (path: string, locale: string) => {
  return path.replace(new RegExp(`^/?${locale}/`), "/")
}

export default async function fetchPaths(locales: Lang[]) {
  const client = new DirectusClient()
  const [{ data: pages }, { data: projects }, { data: posts }, { data: categories }] =
    await Promise.all([
      client.getItems<PageNode>("pages", {
        fields: ["localized_contents.slug", "localized_contents.locale"],
        filter: {
          "localized_contents.locale": {
            in: locales,
          },
        },
      }),
      client.getItems<ProjectNode>("projects", {
        fields: ["localized_contents.slug", "localized_contents.locale"],
        filter: {
          "localized_contents.locale": {
            in: locales,
          },
        },
      }),
      client.getItems<PostNode>("posts", {
        fields: [
          "localized_contents.slug",
          "localized_contents.locale",
          "category.localized_contents.slug",
          "category.localized_contents.locale",
        ],
        filter: {
          "localized_contents.locale": {
            in: locales,
          },
        },
      }),
      client.getItems<CategoryNode>("categories", {
        fields: ["localized_contents.slug", "localized_contents.locale"],
        filter: {
          "localized_contents.locale": {
            in: locales,
          },
        },
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
    ...locales
      .map(lang =>
        new Array(
          Math.ceil(
            posts.filter(p => p.localized_contents.some(lc => lc.locale === lang)).length /
              PAGINATION_LIMIT
          )
        )
          .fill(0)
          .map((_, i) => ({
            params: {
              lang,
              path: withPagination(withoutLocale(routes.blogPath(lang), lang), i + 1),
            },
          }))
      )
      .flat(),
    ...categories
      .map(category => category.localized_contents)
      .flat()
      .map(category =>
        new Array(
          Math.ceil(
            posts.filter(
              p =>
                p.category?.localized_contents.some(
                  lc => lc.slug === category.slug && lc.locale === category.locale
                ) && p.localized_contents.some(lc => lc.locale === category.locale)
            ).length / PAGINATION_LIMIT
          )
        )
          .fill(0)
          .map((_, i) => ({
            params: {
              lang: category.locale,
              path: withPagination(
                withoutLocale(
                  routes.blogCategoryPath(category.slug, category.locale),
                  category.locale
                ),
                i + 1
              ),
            },
          }))
      )
      .flat(),
  ]

  const paths = StaticPaths.concat(dynamicPaths)
    .filter(({ params }) => locales.includes(params.lang as Lang))
    .map(({ params }) => ({
      params: {
        lang: params.lang === DEFAULT_LOCALE ? undefined : params.lang,
        path: params.path === "/" ? undefined : params.path.replace(/^\//, ""),
      },
    }))

  console.log()
  console.log("========================================")
  console.log(paths)
  console.log("========================================")
  console.log()

  return paths
}
