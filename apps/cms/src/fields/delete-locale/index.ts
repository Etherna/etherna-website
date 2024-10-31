import type { UIField } from "payload"

export const deleteLocaleField = (overrides: Partial<UIField> = {}) => {
  return {
    name: "deleteLocale",
    type: "ui",
    ...(overrides || {}),
    admin: {
      position: "sidebar",
      ...(overrides?.admin || {}),
      components: {
        Field: {
          path: "@/fields/delete-locale/field#DeleteLocaleField",
        },
      },
    },
  } satisfies UIField
}
