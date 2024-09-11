import { slugify } from "@/lib/string"

import type { FieldHook } from "payload"

export function slugifyHook(fallback: string): FieldHook {
  return ({ data, operation, value }) => {
    if (typeof value === "string") {
      return slugify(value)
    }

    if (operation === "create" || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === "string") {
        return slugify(fallbackData)
      }
    }

    return value
  }
}
