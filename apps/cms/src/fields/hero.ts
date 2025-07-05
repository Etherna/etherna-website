import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { linkGroup } from "@/fields/link-group"

import type { Field } from "payload"

export const hero: Field = {
  name: "hero",
  label: false,
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      required: true,
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
    linkGroup({
      linkOptions: {
        appearances: ["badge"],
        icon: true,
        overrides: {
          label: false,
        },
      },
      overrides: {
        name: "badges",
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) => type !== "none",
        },
      },
    }),
    linkGroup({
      linkOptions: {
        appearances: ["default", "outline"],
        icon: true,
        overrides: {
          label: false,
        },
      },
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) => type !== "none",
        },
      },
    }),
    {
      name: "media",
      type: "upload",
      localized: true,
      required: false,
      admin: {
        condition: (_, { type } = {}) => ["highImpact", "mediumImpact"].includes(type),
      },
      relationTo: "media",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
}
