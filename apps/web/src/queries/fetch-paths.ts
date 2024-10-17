import { fetchPayloadRequest } from "@/lib/payload"
import { route } from "@/lib/routes"

import type { Locale } from "@/i18n/types"
import type { Category, Page, Post } from "@payload-types"
import type { PaginatedDocs } from "payload"

export const PAGINATION_LIMIT = import.meta.env.DEV ? 2 : 20

export async function fetchPaths(locales: Locale[]) {
  const paths: {
    props: { id: string; page?: number; category?: string }
    params: { lang: Locale; path: string }
  }[] = []

  const results = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      posts: await fetchPayloadRequest<PaginatedDocs<Post>>({
        method: "GET",
        path: "/posts",
        params: { locale, depth: 2 },
      }),
      pages: await fetchPayloadRequest<PaginatedDocs<Page>>({
        method: "GET",
        path: "/pages",
        params: { locale, depth: 5, limit: -1 }, // max nested docs
      }),
    })),
  )

  for (const result of results) {
    const { locale, posts, pages } = result

    for (const page of pages.docs) {
      const segments = (function joinPath(segments: string[], page: Page) {
        const slug = ["home", "homepage"].includes(page.slug ?? "") ? "" : (page.slug ?? "")
        segments.unshift(slug)

        if (page.parent) {
          return joinPath(segments, page.parent as Page)
        }

        return segments
      })([], page)

      for (const post of posts.docs) {
        paths.push({
          props: {
            id: post.id,
          },
          params: {
            lang: locale,
            path: route("/blog/:slug", { slug: post.slug ?? "" }),
          },
        })
      }

      paths.push({
        props: {
          id: page.id,
          page: 1,
        },
        params: {
          lang: locale,
          path: route("/:path", { path: segments.join("/") }),
        },
      })
    }

    for (let page = 2; page <= posts.totalPages; page++) {
      paths.push({
        props: {
          id: "",
          page,
        },
        params: {
          lang: locale,
          path: route("/blog/page/:page", { page: page.toString() }),
        },
      })
    }

    const categoriesPosts = posts.docs.reduce(
      (acc, post) => {
        for (const category of post.categories ?? []) {
          const slug = (category as Category).slug ?? "-"
          const groupIndex = acc.findIndex((group) => group.categorySlug === slug)
          const group = acc[groupIndex]
          if (group) {
            group.posts.push(post)
          } else {
            acc.push({ categorySlug: slug, posts: [post] })
          }
        }
        return acc
      },
      [] as { categorySlug: string; posts: Post[] }[],
    )

    for (const { categorySlug, posts } of categoriesPosts) {
      const totalPages = Math.ceil(posts.length / PAGINATION_LIMIT)

      for (let page = 1; page <= totalPages; page++) {
        paths.push({
          props: {
            id: "",
            page,
            category: categorySlug,
          },
          params: {
            lang: locale,
            path:
              page === 1
                ? route("/blog/category/:category", {
                    category: categorySlug,
                  })
                : route("/blog/category/:category/page/:page", {
                    category: categorySlug,
                    page: page.toString(),
                  }),
          },
        })
      }
    }

    paths.push({
      props: { id: "" },
      params: { lang: locale, path: route("/blog") },
    })

    if (result.locale === "en") {
      paths.push({
        props: { id: "" },
        params: {
          lang: "en",
          path: route("/_preview"),
        },
      })
    }
  }

  return paths
}
