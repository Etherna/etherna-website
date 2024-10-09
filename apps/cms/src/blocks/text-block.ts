import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { background } from "@/fields/background"

import type { Block } from "payload"

export const TextBlock = {
  slug: "text",
  interfaceName: "TextBlock",
  labels: {
    singular: "Text",
    plural: "Text Blocks",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          required: false,
          admin: {
            width: "70%",
          },
        },
        {
          name: "heading",
          type: "select",
          required: true,
          defaultValue: "h2",
          options: [
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
          ],
        },
      ],
    },
    {
      name: "subtitle",
      type: "text",
      localized: true,
      required: false,
    },
    {
      name: "text",
      type: "richText",
      localized: true,
      required: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
    },
    {
      name: "titleSize",
      type: "select",
      required: false,
      options: [
        { label: "Smaller", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Default", value: "default" },
        { label: "Large", value: "lg" },
      ],
      admin: {
        width: "30%",
      },
    },
    {
      name: "centered",
      type: "checkbox",
      required: false,
      defaultValue: false,
      admin: {
        width: "30%",
      },
    },
    {
      name: "forceFullWidth",
      type: "checkbox",
      required: false,
      defaultValue: false,
      admin: {
        width: "30%",
      },
    },
    background(),
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z' /%3E%3Cg fill='%23000'%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' transform='translate(75 68)'%3E%3Ctspan x='.352' y='11'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' transform='translate(75 68)'%3E%3Ctspan x='0' y='24'%3ELorem ipsum dolor sit amet, consectetur adipiscing %3C/tspan%3E%3Ctspan x='0' y='33'%3Eelit, sed do eiusmod tempor incididunt ut labore et %3C/tspan%3E%3Ctspan x='0' y='42'%3Edolore magna aliqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
