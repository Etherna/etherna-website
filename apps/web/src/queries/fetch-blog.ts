import { LOCALES } from "@/i18n/consts"
import { bundleMedia } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"
import { route } from "@/lib/routes"

import type { Locale, LocalizedPath } from "@/i18n/types"
import type { Category, Post } from "@payload-types"
import type { PaginatedDocs } from "payload"

interface FetchBlogParams {
  categoryId?: string
  page?: number
  limit?: number
  locale: Locale
  accessToken?: string
}

export async function fetchBlog(params: FetchBlogParams) {
  const { categoryId, page, limit, locale, accessToken } = params

  const [postsData, categoriesByLocale] = await Promise.all([
    fetchPayloadRequest<PaginatedDocs<Post & { locale: Locale }>>({
      method: "GET",
      path: "/posts",
      params: {
        where: {
          _status: {
            equals: "published",
          },
          categories: categoryId
            ? {
                contains: categoryId,
              }
            : {},
        },
        depth: 2,
        page,
        limit,
        locale,
      },
      accessToken,
    }),
    Promise.all(
      LOCALES.map(async (locale) => {
        return {
          locale,
          categories: await fetchPayloadRequest<PaginatedDocs<Category & { postsCount: number }>>({
            method: "GET",
            path: "/categories",
            params: {
              locale,
              limit: 1000,
              postsCount: true,
            },
            accessToken,
          }).then((res) => ({
            ...res,
            docs: res.docs.filter((cat) => cat.postsCount > 0),
          })),
        }
      }),
    ),
  ])

  const categories = categoriesByLocale.find((c) => c.locale === locale)?.categories.docs ?? []

  const otherLocalCategories = categoriesByLocale
    .filter((c) => c.locale !== locale)
    .map((c) => ({
      locale: c.locale,
      category: c.categories.docs.find((c) => c.id === categoryId),
    }))
  const otherLocales = LOCALES.filter((l) => l !== locale)
  const localizedPaths = categoryId
    ? otherLocalCategories.map(
        (c) =>
          ({
            locale: c.locale,
            path: route("/blog/category/:category", { category: c.category?.slug ?? "-" }),
          }) satisfies LocalizedPath,
      )
    : otherLocales.map(
        (locale) =>
          ({
            locale,
            path: route("/blog"),
          }) satisfies LocalizedPath,
      )

  const posts = {
    ...postsData,
    docs: await Promise.all(
      postsData.docs.map(async (post) => ({
        ...post,
        thumbnail: await bundleMedia(post.thumbnail, locale, accessToken),
        authors: await Promise.all(
          (post.authors ?? [])
            .filter((a) => typeof a === "object")
            .map(async (author) => ({
              ...author,
              avatar: await bundleMedia(author.avatar, locale, accessToken),
            })),
        ),
      })),
    ),
  }

  return {
    posts,
    categories,
    localizedPaths,
  }
}
