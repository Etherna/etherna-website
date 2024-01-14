import { readItems } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { localeToLang } from "@/utils/data-parser"
import { DEFAULT_LOCALE } from "@/utils/lang"
import { routes, withPagination } from "@/utils/routes"

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
] as { params: { lang: Lang; path: string } }[]

export const withoutLocale = (path: string, locale: Lang) => {
  return path.replace(new RegExp(`^/?${locale}/`), "/")
}

export async function fetchPaths(locales: Lang[]) {
  const [pagesResult, projectsResult, postsResult, categoriesResult] = await Promise.all([
    directusClient.request(
      readItems("pages", {
        fields: [
          {
            translations: ["slug", "locale"],
          },
        ],
        filter: {
          translations: {
            locale: {
              // @ts-expect-error
              _regex: new RegExp(`^(${locales.join("|")})`),
            },
          },
        },
      })
    ),
    directusClient.request(
      readItems("projects", {
        fields: [
          {
            translations: ["slug", "locale"],
          },
        ],
        filter: {
          translations: {
            locale: {
              // @ts-expect-error
              _regex: new RegExp(`^(${locales.join("|")})`),
            },
          },
        },
      })
    ),
    directusClient.request(
      readItems("blog_articles", {
        fields: [
          {
            primary_category_id: [
              {
                translations: ["slug", "locale"],
              },
            ],
            translations: ["slug", "locale"],
          },
        ],
        filter: {
          translations: {
            locale: {
              // @ts-expect-error
              _regex: new RegExp(`^(${locales.join("|")})`),
            },
          },
        },
      })
    ),
    directusClient.request(
      readItems("blog_categories", {
        fields: [
          {
            translations: ["slug", "locale"],
          },
        ],
        filter: {
          translations: {
            locale: {
              // @ts-expect-error
              _regex: new RegExp(`^(${locales.join("|")})`),
            },
          },
        },
      })
    ),
  ])

  const dynamicPaths = [
    ...pagesResult
      .flatMap(page => page.translations)
      .filter(Boolean)
      .map(pageTranslation => ({
        params: {
          lang: localeToLang(pageTranslation.locale),
          path: withoutLocale(
            routes.pagePath(pageTranslation.slug, localeToLang(pageTranslation.locale)),
            localeToLang(pageTranslation.locale)
          ),
        },
      })),
    ...projectsResult
      .flatMap(project => project.translations)
      .filter(Boolean)
      .map(projectTranslation => ({
        params: {
          lang: localeToLang(projectTranslation.locale),
          path: withoutLocale(
            routes.projectPath(projectTranslation.slug, localeToLang(projectTranslation.locale)),
            localeToLang(projectTranslation.locale)
          ),
        },
      })),
    ...postsResult
      .flatMap(post => post.translations)
      .filter(Boolean)
      .map(postTranslation => ({
        params: {
          lang: localeToLang(postTranslation.locale),
          path: withoutLocale(
            routes.blogPostPath(postTranslation.slug, localeToLang(postTranslation.locale)),
            localeToLang(postTranslation.locale)
          ),
        },
      })),
    ...locales
      .map(lang =>
        new Array(
          Math.ceil(
            postsResult.filter(p => p.translations?.some(lc => localeToLang(lc.locale) === lang))
              .length / PAGINATION_LIMIT
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
    ...categoriesResult
      .flatMap(category => category.translations)
      .filter(Boolean)
      .map(category =>
        new Array(
          Math.ceil(
            postsResult.filter(
              p =>
                (p.primary_category_id as BlogCategory | null)?.translations.some(
                  lc => lc.slug === category.slug && lc.locale === category.locale
                ) && p.translations?.some(lc => lc.locale === category.locale)
            ).length / PAGINATION_LIMIT
          )
        )
          .fill(0)
          .map((_, i) => ({
            params: {
              lang: localeToLang(category.locale),
              path: withPagination(
                withoutLocale(
                  routes.blogCategoryPath(category.slug, localeToLang(category.locale)),
                  localeToLang(category.locale)
                ),
                i + 1
              ),
            },
          }))
      )
      .flat(),
  ] satisfies { params: { lang: Lang; path: string } }[]

  const paths = StaticPaths.concat(dynamicPaths)
    .filter(({ params }) => locales.includes(params.lang))
    .map(({ params }) => ({
      params: {
        lang: params.lang === DEFAULT_LOCALE ? undefined : params.lang,
        path: params.path === "/" ? undefined : params.path.replace(/^\//, ""),
      },
    }))

  return paths
}
