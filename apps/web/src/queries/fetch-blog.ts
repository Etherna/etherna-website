import { fetchPayloadRequest } from "@/lib/payload"

import type { Locale, LocalizedPath } from "@/i18n/types"
import type { Category, Post } from "@payload-types"
import type { PaginatedDocs } from "payload"

interface FetchBlogParams {
  categorySlug?: string
  page?: number
  limit?: number
  locale: Locale
  accessToken?: string
}

export async function fetchBlog(params: FetchBlogParams) {
  const { categorySlug, page, limit, locale, accessToken } = params

  const [posts, categories] = await Promise.all([
    fetchPayloadRequest<PaginatedDocs<Post>>({
      method: "GET",
      path: "/posts",
      params: {
        where: {
          "categories.slug": categorySlug
            ? {
                equals: categorySlug,
              }
            : {},
        },
        depth: 2,
        locale,
        page,
        limit,
      },
      accessToken,
    }),
    fetchPayloadRequest<PaginatedDocs<Category>>({
      method: "GET",
      path: "/categories",
      params: {
        locale,
      },
      accessToken,
    }),
  ])

  const localizedPaths = [] satisfies LocalizedPath[]

  return {
    posts,
    categories,
    localizedPaths,
  }
}
