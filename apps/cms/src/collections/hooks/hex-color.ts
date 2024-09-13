import type { FieldHook } from "payload"

export const hexColorHook =
  (): FieldHook =>
  ({ value }) => {
    const color = ((value as string) ?? "").replace(/^#/, "")

    if (color.length !== 3 && color.length !== 6) {
      throw new Error("Invalid color")
    }

    return `#${color}`
  }
