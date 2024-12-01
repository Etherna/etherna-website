import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { background } from "@/fields/background"

import type { Block } from "payload"

export const MilestonesBlock = {
  slug: "mlst",
  interfaceName: "MilestonesBlock",
  labels: {
    singular: "Milestones",
    plural: "Milestones Block",
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        {
          value: "timeline",
          label: "Timeline",
        },
        {
          value: "roadmap",
          label: "Roadmap",
        },
      ],
    },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "date",
          type: "text",
          required: true,
          minLength: 4,
          maxLength: 10,
        },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "completed",
          options: [
            {
              value: "completed",
              label: "Completed",
            },
            {
              value: "active",
              label: "Active",
            },
            {
              value: "upcoming",
              label: "Upcoming",
            },
          ],
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
        {
          name: "media",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    background(),
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z' /%3E%3Cpath fill='%23464646' d='M0 88h320v3H0z' /%3E%3Cpath fill='%23B2B2B2' d='M5 85h310v1H5zM5 93h310v1H5z' /%3E%3Crect fill='%2364748B' x='35' y='104' width='38' height='15' rx='7.5' /%3E%3Crect stroke='%2334C7D9' x='142' y='61.5' width='37' height='14' rx='7' /%3E%3Crect stroke='%2394A3B8' x='248.5' y='104.5' width='37' height='14' rx='7' /%3E%3Ctext font-family='Geist-Medium, Geist' font-size='8' font-weight='400' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='29' y='39'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='8' font-weight='400' letter-spacing='-.385' fill='%23FFF'%3E%3Ctspan x='44.5' y='114'%3E2020%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='8' font-weight='400' letter-spacing='-.385' fill='%2300AABD'%3E%3Ctspan x='151.978' y='71'%3E2021%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='8' font-weight='400' letter-spacing='-.385' fill='%2394A3B8'%3E%3Ctspan x='257.582' y='114'%3E2022%3C/tspan%3E%3C/text%3E%3Ctext opacity='.546' font-family='Geist-Medium, Geist' font-size='8' font-weight='400' letter-spacing='-.385' fill='%2367778E'%3E%3Ctspan x='245' y='42'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='8' font-weight='400' letter-spacing='-.385' fill='%2300AABD'%3E%3Ctspan x='139' y='146'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Cpath stroke='%2367778E' opacity='.486' stroke-linecap='square' stroke-dasharray='1 4' d='M267.5 79.5v-33' /%3E%3Cpath stroke='%2367778E' stroke-linecap='square' stroke-dasharray='1 4' d='M53.5 79.5v-33' /%3E%3Cpath stroke='%2300AABD' stroke-linecap='square' stroke-dasharray='1 4' d='M160.5 135.5v-33' /%3E%3Ccircle fill='%23E1E7EF' cx='268' cy='90' r='8' /%3E%3Ccircle fill='%2300AABD' cx='160' cy='90' r='8' /%3E%3Ccircle fill='%2367778E' cx='54' cy='90' r='8' /%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
