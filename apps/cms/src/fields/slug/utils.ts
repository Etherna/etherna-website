import type { FieldHook } from "payload"

export function slugify(val: string, connector = "-") {
  return val
    .toLowerCase()
    .replace(/ +/g, connector)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(new RegExp(`[^a-z0-9${connector}]`, "g"), "")
    .replace(new RegExp(`${connector}+`, "g"), connector)
    .replace(new RegExp(`^${connector}|${connector}$`, "g"), "")
}

export function slugifyHook(fallback: string): FieldHook {
  return ({ data, operation, originalDoc, value }) => {
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
