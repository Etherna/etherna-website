import { colorField } from "./color"

import type { GroupField } from "payload"

export const background = (overrides?: Partial<GroupField>) =>
  ({
    name: "background",
    label: "Background",
    type: "group",
    ...overrides,
    fields: [
      {
        name: "type",
        label: "Type",
        type: "select",
        defaultValue: "none",
        localized: true,
        options: [
          {
            label: "None",
            value: "none",
          },
          {
            label: "Color",
            value: "color",
          },
          {
            label: "Image",
            value: "image",
          },
          {
            label: "Vertical gradient",
            value: "verticalGradient",
          },
          {
            label: "Horizontal gradient",
            value: "horizontalGradient",
          },
        ],
        required: true,
      },
      {
        name: "backgroundImage",
        type: "upload",
        relationTo: "media",
        required: true,
        admin: {
          condition: (_, { type } = {}) => type === "image",
        },
      },
      colorField({
        required: false,
        admin: {
          condition: (_, { type } = {}) => type === "color",
        },
      }),
      {
        name: "colorStops",
        type: "array",
        required: false,
        defaultValue: [],
        admin: {
          condition: (_, { type } = {}) => type.includes("Gradient"),
        },
        fields: [
          colorField({
            required: true,
          }),
          {
            name: "stop",
            type: "number",
            required: true,
            min: 0,
            max: 1,
          },
        ],
      },
    ],
  }) satisfies GroupField
