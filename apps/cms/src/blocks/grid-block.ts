import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { TextBlock } from "./text-block"
import { background } from "@/fields/background"
import { colorField } from "@/fields/color"
import { link } from "@/fields/link"

import type { Block } from "payload"

export const GridBlock = {
  slug: "grid",
  interfaceName: "GridBlock",
  labels: {
    singular: "Grid",
    plural: "Grid Blocks",
  },
  fields: [
    ...TextBlock.fields,
    {
      name: "size",
      type: "select",
      defaultValue: "default",
      options: [
        {
          value: "default",
          label: "Default",
        },
        {
          value: "large",
          label: "Large",
        },
      ],
    },
    {
      name: "rows",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "items",
          type: "array",
          minRows: 1,
          maxRows: 3,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: {
                path: "@/fields/row-label/component",
                clientProps: {
                  useAsTitle: "title",
                },
              },
            },
          },
          fields: [
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
            },
            background(),
            {
              name: "effect",
              type: "select",
              defaultValue: "zoom",
              options: [
                {
                  value: "none",
                  label: "None",
                },
                {
                  value: "appear",
                  label: "Appear",
                },
                {
                  value: "zoom",
                  label: "Zoom",
                },
                {
                  value: "slide",
                  label: "Slide",
                },
              ],
              admin: {
                width: "50%",
              },
            },
            colorField({
              name: "accentColor",
              admin: {
                width: "50%",
              },
            }),
            link({ required: false, disableLabel: true, appearances: false }),
          ],
        },
      ],
    },
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cdefs%3E%3ClinearGradient x1='100%25' y1='50%25' x2='0%25' y2='50%25' id='prefix__a'%3E%3Cstop stop-color='%23FFF' stop-opacity='.135' offset='0%25'/%3E%3Cstop stop-color='%239D9D9D' stop-opacity='.344' offset='50.172%25'/%3E%3Cstop stop-color='%23FFF' stop-opacity='.145' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Cg fill='%23000'%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' transform='translate(75 13)'%3E%3Ctspan x='35.352' y='11'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' transform='translate(75 13)'%3E%3Ctspan x='.623' y='26'%3ELorem ipsum dolor sit amet, consectetur adipiscing %3C/tspan%3E%3Ctspan x='2.468' y='35'%3Eelit, sed do eiusmod tempor incididunt ut labore et %3C/tspan%3E%3Ctspan x='50.161' y='44'%3Edolore magna aliqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3Cpath stroke='url(%23prefix__a)' stroke-linecap='square' d='M7.5 75.5h306M6.5 134.5h306'/%3E%3Cpath stroke='%23D9D9D9' stroke-linecap='square' d='M159.5 75.5v59M100.5 134.5v59M219.5 134.5v59'/%3E%3Cg font-family='Geist-Medium, Geist' font-weight='400'%3E%3Ctext font-size='8' letter-spacing='-.385' fill='%23000' transform='translate(20 87)'%3E%3Ctspan x='0' y='7'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-size='6' letter-spacing='-.289' fill='%238A8A8A' transform='translate(20 87)'%3E%3Ctspan x='0' y='17'%3ELorem ipsum dolor sit %3C/tspan%3E%3Ctspan x='0' y='24'%3Eamet, consectetur %3C/tspan%3E%3Ctspan x='0' y='31'%3Eadipiscing elit%3C/tspan%3E%3C/text%3E%3C/g%3E%3Cg font-family='Geist-Medium, Geist' font-weight='400'%3E%3Ctext font-size='8' letter-spacing='-.385' fill='%23000' transform='translate(176 87)'%3E%3Ctspan x='0' y='7'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-size='6' letter-spacing='-.289' fill='%238A8A8A' transform='translate(176 87)'%3E%3Ctspan x='0' y='17'%3ELorem ipsum dolor sit %3C/tspan%3E%3Ctspan x='0' y='24'%3Eamet, consectetur %3C/tspan%3E%3Ctspan x='0' y='31'%3Eadipiscing elit%3C/tspan%3E%3C/text%3E%3C/g%3E%3Cg font-family='Geist-Medium, Geist' font-weight='400'%3E%3Ctext font-size='8' letter-spacing='-.385' fill='%23000' transform='translate(20 141)'%3E%3Ctspan x='0' y='7'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-size='6' letter-spacing='-.289' fill='%238A8A8A' transform='translate(20 141)'%3E%3Ctspan x='0' y='17'%3ELorem ipsum dolor sit %3C/tspan%3E%3Ctspan x='0' y='24'%3Eamet, consectetur %3C/tspan%3E%3Ctspan x='0' y='31'%3Eadipiscing elit%3C/tspan%3E%3C/text%3E%3C/g%3E%3Cg font-family='Geist-Medium, Geist' font-weight='400'%3E%3Ctext font-size='8' letter-spacing='-.385' fill='%23000' transform='translate(117 141)'%3E%3Ctspan x='0' y='7'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-size='6' letter-spacing='-.289' fill='%238A8A8A' transform='translate(117 141)'%3E%3Ctspan x='0' y='17'%3ELorem ipsum dolor sit %3C/tspan%3E%3Ctspan x='0' y='24'%3Eamet, consectetur %3C/tspan%3E%3Ctspan x='0' y='31'%3Eadipiscing elit%3C/tspan%3E%3C/text%3E%3C/g%3E%3Cg font-family='Geist-Medium, Geist' font-weight='400'%3E%3Ctext font-size='8' letter-spacing='-.385' fill='%23000' transform='translate(236 141)'%3E%3Ctspan x='0' y='7'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-size='6' letter-spacing='-.289' fill='%238A8A8A' transform='translate(236 141)'%3E%3Ctspan x='0' y='17'%3ELorem ipsum dolor sit %3C/tspan%3E%3Ctspan x='0' y='24'%3Eamet, consectetur %3C/tspan%3E%3Ctspan x='0' y='31'%3Eadipiscing elit%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
