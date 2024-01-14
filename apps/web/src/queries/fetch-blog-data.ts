import { aggregate, readItems } from "@directus/sdk"

import { PAGINATION_LIMIT } from "./fetch-paths"
import { directusClient } from "@/classes/directus-client"
import { findTranslation, parseFluidImage } from "@/utils/data-parser"
import { Languages } from "@/utils/lang"
import { parsePage, parseSlug, routes, whichRoute } from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"
import type { DirectusFile, QueryFilter } from "@directus/sdk"

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
          "updated_at",
          {
            primary_category_id: ["id"],
          },
          {
            author_id: [
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
      const categoryTranslation = res.primary_category_id
        ? findTranslation(res.primary_category_id.translations, lang)
        : undefined
      return {
        publishedAt: res.published_at,
        updatedAt: res.updated_at,
        primaryCategory:
          res.primary_category_id && categoryTranslation
            ? {
                id: res.primary_category_id.id,
                color: res.primary_category_id.color,
                name: categoryTranslation.name,
                slug: categoryTranslation.slug,
                description: categoryTranslation.description,
                locale: categoryTranslation.locale,
              }
            : null,
        author: res.author_id
          ? {
              firstName: res.author_id.first_name,
              lastName: res.author_id.last_name,
              email: res.author_id.email,
              avatar: await parseFluidImage(
                res.author_id.avatar as DirectusFile<DirectusSchema> | null,
                `${res.author_id.first_name} ${res.author_id.last_name} picture`
              ),
            }
          : null,
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
