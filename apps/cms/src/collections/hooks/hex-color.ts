import type { FieldHook } from "payload"

export const hexColorHook =
  (): FieldHook =>
  ({ value }) => {
    if (!value) {
      return ""
    }

    const color = ((value as string) ?? "").replace(/^#/, "")

    return `#${color}`
  }
