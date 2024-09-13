import { hexColorHook } from "@/collections/hooks/hex-color"

import type { TextField } from "payload"

export const colorField = (overrides: Partial<TextField> = {}) =>
  ({
    name: "color",
    label: "Color",
    type: "text",
    ...(overrides || {}),
    hasMany: false,
    minRows: undefined,
    maxRows: undefined,
    minLength: 4,
    maxLength: 7,
    hooks: {
      beforeValidate: [hexColorHook()],
    },
    admin: {
      components: {
        Field: {
          path: "@/fields/color/field#ColorField",
        },
        Cell: {
          path: "@/fields/color/cell#ColorCell",
        },
      },
    },
  }) satisfies TextField
