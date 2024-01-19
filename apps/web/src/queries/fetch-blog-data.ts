import { aggregate, readItems } from "@directus/sdk"

import { PAGINATION_LIMIT } from "./fetch-paths"
import { directusClient } from "@/classes/directus-client"
import { findTranslation, parseFluidImage } from "@/utils/data-parser"
import { Languages } from "@/utils/lang"
import { parsePage, parseSlug, routes, whichRoute } from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"
import type { DirectusFile, QueryFilter } from "@directus/sdk"

export type ParsedBlogData = Awaited<ReturnType<typeof fetchBlogData>>

export async function fetchBlogData(lang: Lang, path: string) {
  const routeIdentifier = whichRoute(path, lang)
  const page = parsePage(path) ?? 1
  const categorySlug = routeIdentifier === "category" ? parseSlug(path) : null

  const postsFilter: QueryFilter<DirectusSchema, BlogArticle> = {
    _and: [
      {
        _or: [
          {
            translations: {
              locale: {
                _starts_with: lang as Locale,
              },
            },
          },
          {
            translations: {
              locale: {
                _eq: "en-US",
              },
            },
          },
        ],
      },
      categorySlug
        ? {
            primary_category_id: {
              translations: {
                slug: {
                  _eq: categorySlug,
                },
              },
            },
          }
        : {},
      {
        published_at: {
          _lte: new Date().toISOString(),
        },
      },
    ],
  }

  const [postsCountResult, postsResult, categoriesResult] = await Promise.all([
    directusClient.request(
      aggregate("blog_articles", {
        aggregate: {
          count: "id",
        },
        query: {
          filter: postsFilter,
        },
      })
    ),
    directusClient.request(
      readItems("blog_articles", {
        fields: [
          "published_at",
          "edited_at",
          {
            primary_category_id: ["id"],
          },
          {
            author_id: [
              "id",
              "first_name",
              "last_name",
              "email",
              { avatar: ["id", "width", "height", "title", "type"] },
            ],
          },
          {
            translations: [
              "title",
              "slug",
              "content",
              "excerpt",
              "seo",
              "locale",
              { thumbnail: ["id", "width", "height", "title", "type"] },
            ],
          },
        ],
        filter: postsFilter,
        sort: ["-published_at"],
        limit: PAGINATION_LIMIT,
        page,
      })
    ),
    directusClient.request(
      readItems("blog_categories", {
        fields: [
          "id",
          "color",
          {
            translations: ["name", "slug", "description", "locale"],
          },
        ],
        filter: {
          translations: {
            locale: {
              _starts_with: lang as Locale,
            },
          },
        },
      })
    ),
  ])

  const count = Number(postsCountResult[0]?.count ?? 0)
  const pagesCount = Math.ceil(count / PAGINATION_LIMIT)
  const categories = categoriesResult.map(res => {
    const translation = findTranslation(res.translations ?? [], lang)
    return {
      id: res.id,
      color: res.color,
      name: translation.name,
      slug: translation.slug,
      description: translation.description,
      locale: translation.locale,
    }
  })
  const currentCategory = categories.find(c => c.slug === categorySlug)
  const posts = await Promise.all(
    postsResult.map(async res => {
      const translation = findTranslation(res.translations ?? [], lang)
      return {
        publishedAt: res.published_at as string,
        editedAt: res.edited_at,
        primaryCategory: categories.find(c => c.id === res.primary_category_id?.id) ?? null,
        author: {
          id: res.author_id.id,
          firstName: res.author_id.first_name,
          lastName: res.author_id.last_name,
          email: res.author_id.email,
          avatar: await parseFluidImage(
            res.author_id.avatar as DirectusFile<DirectusSchema> | null,
            `${res.author_id.first_name} ${res.author_id.last_name} picture`
          ),
        },
        title: translation.title,
        slug: translation.slug,
        content: translation.content,
        thumbnail: await parseFluidImage(translation.thumbnail, `${translation.title} thumbnail`),
        excerpt: translation.excerpt,
        seo: translation.seo,
        locale: translation.locale,
      }
    })
  )
  const localizedPaths: LocalizedPaths = Languages.reduce(
    (acc, pathLang) => ({
      ...acc,
      [pathLang]: categorySlug
        ? routes.blogCategoryPath(
            categoriesResult
              .find(c => c.translations?.some(lc => lc.slug === categorySlug))
              ?.translations?.find(lc => lc.locale.startsWith(pathLang))?.slug ?? categorySlug,
            pathLang
          )
        : routes.blogPath(pathLang),
    }),
    {}
  )

  return {
    posts,
    categories,
    currentCategory,
    page,
    pagesCount,
    localizedPaths,
  }
}
