import { TextBlock } from "./text-block"

import type { Block } from "payload"

export const StatsBlock = {
  slug: "stats",
  interfaceName: "StatsBlock",
  labels: {
    singular: "Stats",
    plural: "Stats Blocks",
  },
  fields: [
    ...TextBlock.fields,
    {
      name: "stats",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "value",
          type: "number",
          required: true,
        },
      ],
    },
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Ctext font-family='Geist-Medium, Geist' font-size='10' font-weight='400' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='40.379' y='79'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Black, Geist' font-size='30' font-weight='700' letter-spacing='-1.443' fill='%23000'%3E%3Ctspan x='40.5' y='109'%3E2M%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Black, Geist' font-size='30' font-weight='700' letter-spacing='-1.443' fill='%23000'%3E%3Ctspan x='132.5' y='109'%3E140k%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Black, Geist' font-size='30' font-weight='700' letter-spacing='-1.443' fill='%23000'%3E%3Ctspan x='224.5' y='109'%3E21k%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='10' font-weight='400' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='132.379' y='79'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='10' font-weight='400' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='224.379' y='79'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
