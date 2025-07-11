import { slugifyHook } from "@/hooks/slugify"

import type { CheckboxField, TextField } from "payload"

interface Overrides {
  slugOverrides?: Partial<TextField & { hasMany: false }>
  checkboxOverrides?: Partial<CheckboxField>
}

export const slugField = (fieldToUse = "title", overrides: Overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides

  const checkBoxField = {
    name: "slugLock",
    type: "checkbox",
    defaultValue: true,
    admin: {
      hidden: true,
      position: "sidebar",
    },
    ...checkboxOverrides,
  } satisfies CheckboxField

  const slugField = {
    name: "slug",
    type: "text",
    index: true,
    label: "Slug",
    localized: true,
    ...(slugOverrides || {}),
    hasMany: false,
    minRows: undefined,
    maxRows: undefined,
    hooks: {
      beforeValidate: [slugifyHook(fieldToUse)],
    },
    admin: {
      position: "sidebar",
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: "@/fields/slug/field#SlugField",
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  } satisfies TextField

  return [slugField, checkBoxField]
}
