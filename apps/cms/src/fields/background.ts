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
        required: true,
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
        admin: {
          width: "50%",
        },
      },
      {
        name: "inverted",
        type: "checkbox",
        required: false,
        admin: {
          condition: (_, { type } = {}) => type.includes("Gradient"),
          width: "50%",
        },
      },
      {
        name: "dark",
        type: "checkbox",
        required: false,
        admin: {
          condition: (_, { type } = {}) => type !== "none",
          width: "50%",
        },
      },
      {
        name: "backgroundImage",
        type: "upload",
        relationTo: "media",
        required: true,
        admin: {
          condition: (_, { type } = {}) => type === "image",
          width: "50%",
        },
      },
      colorField({
        required: false,
        admin: {
          condition: (_, { type } = {}) => type === "color",
          width: "50%",
        },
      }),
      {
        name: "colorStops",
        type: "array",
        required: false,
        defaultValue: [],
        admin: {
          condition: (_, { type } = {}) => type.includes("Gradient"),
          width: "50%",
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
