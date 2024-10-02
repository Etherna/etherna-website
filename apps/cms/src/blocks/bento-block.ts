import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { TextBlock } from "./text-block"
import { background } from "@/fields/background"
import { link } from "@/fields/link"

import type { Block } from "payload"

export const BentoBlock = {
  slug: "bento",
  interfaceName: "BentoBlock",
  labels: {
    singular: "Bento",
    plural: "Bento Blocks",
  },
  fields: [
    ...TextBlock.fields,
    {
      name: "items",
      type: "array",
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
          name: "rowSpan",
          type: "number",
          defaultValue: 1,
          min: 1,
          max: 2,
          admin: {
            width: "50%",
          },
        },
        {
          name: "colSpan",
          type: "number",
          defaultValue: 1,
          min: 1,
          max: 2,
          admin: {
            width: "50%",
          },
        },
        link({ required: false, disableLabel: true, appearances: false }),
      ],
    },
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Crect fill='%23E1E5EF' x='88' y='-28' width='68' height='68' rx='12'/%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='96.24' y='16'%3ELorem ipsum %3C/tspan%3E%3Ctspan x='96.24' y='25'%3Edolor sit amet%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' fill='%23000'%3E%3Ctspan x='96' y='-2'%3ELorem %3C/tspan%3E%3Ctspan x='96' y='7'%3Eipsum%3C/tspan%3E%3C/text%3E%3Crect fill='%23E1E5EF' x='88' y='139' width='68' height='68' rx='12'/%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='97.74' y='178'%3ELorem ipsum dol%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' fill='%23000'%3E%3Ctspan x='97.5' y='160'%3ELorem %3C/tspan%3E%3Ctspan x='97.5' y='169'%3Eipsum%3C/tspan%3E%3C/text%3E%3Crect fill='%23E1E5EF' x='164' y='139' width='68' height='68' rx='12'/%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' fill='%23000'%3E%3Ctspan x='173' y='160'%3ELorem %3C/tspan%3E%3Ctspan x='173' y='169'%3Eipsum%3C/tspan%3E%3C/text%3E%3Crect fill='%23E1E5EF' x='164' y='-28' width='68' height='68' rx='12'/%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='173.24' y='16'%3ELorem ipsum %3C/tspan%3E%3Ctspan x='173.24' y='25'%3Edolor sit amet%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' fill='%23000'%3E%3Ctspan x='173' y='-2'%3ELorem %3C/tspan%3E%3Ctspan x='173' y='7'%3Eipsum%3C/tspan%3E%3C/text%3E%3Crect fill='%23E1E5EF' x='88' y='48' width='144' height='83' rx='12'/%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='104' y='89'%3ELorem ipsum dolor sit amet, %3C/tspan%3E%3Ctspan x='104' y='98'%3Econsectetur adipiscing elit, sed do %3C/tspan%3E%3Ctspan x='104' y='107'%3Eeiusmod tempor incididunt ut %3C/tspan%3E%3Ctspan x='104' y='116'%3Elabore et dolore magna aliqua. %3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' fill='%23000'%3E%3Ctspan x='104.635' y='75'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='173.24' y='178'%3ELorem ipsum dol%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
