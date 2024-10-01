import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { linkGroup } from "@/fields/link-group"

import type { Field } from "payload"

export const hero: Field = {
  name: "hero",
  label: "Hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      localized: true,
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "High Impact",
          value: "highImpact",
        },
        {
          label: "Medium Impact",
          value: "mediumImpact",
        },
        {
          label: "Low Impact",
          value: "lowImpact",
        },
      ],
      required: true,
    },
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
      admin: {
        condition: (_, { type } = {}) => type !== "none",
      },
    },
    {
      type: "row",
      fields: [
        linkGroup({
          linkOptions: {
            appearances: ["badge"],
          },
          overrides: {
            name: "badges",
            maxRows: 2,
            localized: true,
            admin: {
              width: "50%",

              condition: (_, { type } = {}) => type !== "none",
            },
          },
        }),
        linkGroup({
          linkOptions: {
            appearances: ["default", "outline"],
          },
          overrides: {
            maxRows: 2,
            localized: true,
            admin: {
              width: "50%",
              condition: (_, { type } = {}) => type !== "none",
            },
          },
        }),
      ],
    },
    {
      name: "media",
      type: "upload",
      localized: true,
      admin: {
        condition: (_, { type } = {}) => ["highImpact", "mediumImpact"].includes(type),
      },
      relationTo: "media",
      required: false,
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
}
