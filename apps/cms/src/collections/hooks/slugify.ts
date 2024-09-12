import { RESERVED_PAGE_SLUGS } from "@/lib/const"
import { slugify } from "@/lib/string"

import type { FieldHook } from "payload"

function evalReservedNames(value: string | undefined) {
  if (value && RESERVED_PAGE_SLUGS.includes(value.toLowerCase())) {
    throw new Error(`The slug "${value}" is reserved and cannot be used`)
  }
}

export function slugifyHook(fallback: string): FieldHook {
  return ({ data, operation, value }) => {
    let slug = value as string

    if (typeof value === "string") {
      slug = slugify(value)
    }

    if (operation === "create" || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === "string") {
        slug = slugify(fallbackData)
      }
    }

    evalReservedNames(slug)

    return slug
  }
}
