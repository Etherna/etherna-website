import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

import { link } from "./link"
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
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
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
