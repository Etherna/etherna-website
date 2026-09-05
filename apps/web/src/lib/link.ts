import { localized } from "@/i18n/utils"
import { route } from "@/lib/routes"

import type { Locale } from "@/i18n/types"
import type { Page, Post, Redirect } from "@payload-types"

export interface LinkRelation {
  relationTo?: string | null
  value?: unknown
}

export interface ResolvableLinkFields {
  linkType?: string | null
  url?: string | null
  doc?: LinkRelation | null
}

export function hrefFromRelation(
  relation: LinkRelation | null | undefined,
  locale: Locale,
): string | undefined {
  const relationTo = relation?.relationTo
  const value = relation?.value

  if (!value || typeof value === "string") {
    return undefined
  }

  switch (relationTo) {
    case "pages": {
      const page = value as Page
      return localized(
        route("/:path", {
          path: (page.breadcrumbs?.at(-1)?.url ?? page.slug ?? "").replace(/^\//, ""),
        }),
        locale,
      )
    }
    case "posts": {
      const post = value as Post
      return localized(
        route("/blog/:slug", {
          slug: (post.slug ?? "").replace(/^\//, ""),
        }),
        locale,
      )
    }
    case "redirects": {
      const redirect = value as Redirect
      if (!redirect.from) {
        return undefined
      }
      return route("/:path", {
        path: redirect.from.replace(/^\//, ""),
      })
    }
    default:
      return undefined
  }
}

export function resolveLinkHref(
  fields: ResolvableLinkFields | null | undefined,
  locale: Locale,
): string | undefined {
  if (!fields) {
    return undefined
  }

  const isInternal = fields.linkType === "internal" || fields.linkType === "reference"
  if (isInternal) {
    return hrefFromRelation(fields.doc, locale) ?? fields.url ?? undefined
  }

  return fields.url ?? undefined
}
