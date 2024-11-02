import { resolveInternalLink } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"
import { route } from "@/lib/routes"

import type { Locale } from "@/i18n/types"
import type { Category, Page, Post, Redirect } from "@payload-types"
import type { PaginatedDocs } from "payload"

export const PAGINATION_LIMIT = import.meta.env.DEV ? 3 : 20

export async function fetchPaths(locales: Locale[]) {
  const paths: {
    props: { id: string; page?: number; category?: string; redirectUrl?: string }
    params: { lang: Locale; path: string }
  }[] = []

  const localizedPagesResults = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      posts: await fetchPayloadRequest<PaginatedDocs<Post>>({
        method: "GET",
        path: "/posts",
        params: { locale, depth: 2, limit: 0 },
      }),
      pages: await fetchPayloadRequest<PaginatedDocs<Page>>({
        method: "GET",
        path: "/pages",
        params: { locale, depth: 5, limit: 0 }, // max nested docs
      }),
      categories: await fetchPayloadRequest<PaginatedDocs<Category>>({
        method: "GET",
        path: "/categories",
        params: { locale, limit: 0 },
      }),
    })),
  )
  const redirects = await fetchPayloadRequest<PaginatedDocs<Redirect>>({
    method: "GET",
    path: "/redirects",
    params: { limit: 0 },
  })

  for (const result of localizedPagesResults) {
    const { locale, posts, pages, categories } = result

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

    const postsPages = Math.ceil(posts.totalDocs / PAGINATION_LIMIT)
    for (let page = 2; page <= postsPages; page++) {
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

    for (const { slug, id } of categories.docs) {
      const postsCount = posts.docs.filter((post) =>
        post.categories?.some((c) => (c as Category).id === id),
      ).length
      const totalPages = Math.ceil(postsCount / PAGINATION_LIMIT)

      for (let page = 1; page <= totalPages; page++) {
        paths.push({
          props: {
            id,
            page,
            category: slug ?? "-",
          },
          params: {
            lang: locale,
            path:
              page === 1
                ? route("/blog/category/:category", {
                    category: slug ?? "-",
                  })
                : route("/blog/category/:category/page/:page", {
                    category: slug ?? "-",
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

  for (const redirect of redirects.docs) {
    const redirectUrl = (await resolveInternalLink(redirect.to, "en"))?.url ?? ""
    paths.push({
      props: { id: redirect.id, redirectUrl },
      params: { lang: "en", path: redirect.from },
    })
  }

  return paths
}
