import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { TextBlock } from "./text-block"

import type { Block } from "payload"

export const FAQBlock = {
  slug: "faq",
  interfaceName: "FAQBlock",
  labels: {
    singular: "FAQ",
    plural: "FAQ Blocks",
  },
  fields: [
    ...TextBlock.fields,
    {
      name: "faqs",
      type: "array",
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: {
            path: "@/fields/row-label/component",
            clientProps: {
              useAsTitle: "question",
            },
          },
        },
      },
      fields: [
        {
          name: "question",
          type: "text",
          localized: true,
        },
        {
          name: "text",
          type: "richText",
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures]
            },
          }),
        },
      ],
    },
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Cg fill='%23000'%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' transform='translate(28 68)'%3E%3Ctspan x='.352' y='11'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' transform='translate(28 68)'%3E%3Ctspan x='0' y='24'%3ELorem ipsum dolor sit amet, consectetur %3C/tspan%3E%3Ctspan x='0' y='33'%3Eadipiscing elit, sed do eiusmod tempor %3C/tspan%3E%3Ctspan x='0' y='42'%3Eincididunt ut labore et dolore magna %3C/tspan%3E%3Ctspan x='0' y='51'%3Ealiqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3Ctext font-family='Geist-Medium, Geist' font-size='10' font-weight='400' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='175' y='56'%3ELorem ipsum dolor sit %3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='10' font-weight='400' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='175' y='106'%3ELorem ipsum dolor sit %3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='10' font-weight='400' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='175' y='131'%3ELorem ipsum dolor sit %3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='10' font-weight='400' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='175' y='81'%3ELorem ipsum dolor sit %3C/tspan%3E%3C/text%3E%3Cpath stroke='%23E0E0E0' stroke-width='.5' stroke-linecap='square' d='M174.5 64.5h118M175.5 90.5h118M175.5 115.5h118'/%3E%3Cpath d='M283.5 48.5v8m-4-4h8M283.5 73.5v8m-4-4h8M283.5 99.5v8m-4-4h8M283.5 123.5v8m-4-4h8' stroke='%23575757' stroke-linecap='square'/%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
