import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { background } from "@/fields/background"

import type { Block } from "payload"

export const ProseBlock = {
  slug: "prose",
  interfaceName: "ProseBlock",
  labels: {
    singular: "Prose",
    plural: "Prose Blocks",
  },
  fields: [
    {
      name: "content",
      type: "richText",
      localized: true,
      required: false,
      label: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
    },
    background(),
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Cg fill='%23000'%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' transform='translate(27 17)'%3E%3Ctspan x='.352' y='11'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' transform='translate(27 17)'%3E%3Ctspan x='0' y='24'%3ELorem ipsum dolor sit amet, consectetur adipiscing %3C/tspan%3E%3Ctspan x='0' y='33'%3Eelit, sed do eiusmod tempor incididunt ut labore et %3C/tspan%3E%3Ctspan x='0' y='42'%3Edolore magna aliqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3Cg transform='translate(27 71)'%3E%3Ctext font-family='Geist-SemiBold, Geist' font-size='10' font-weight='500' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='.44' y='9'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='0' y='23'%3ELorem ipsum dolor sit amet, consectetur adipiscing %3C/tspan%3E%3Ctspan x='0' y='32'%3Eelit. %3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='5' y='46'%3ELorem ipsum dolor sit amet, consectetur adipiscing %3C/tspan%3E%3Ctspan x='5' y='55'%3Eelit. %3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='5' y='72'%3ELorem ipsum dolor sit amet,%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='5' y='84'%3ELorem ipsum dolor sit amet,%3C/tspan%3E%3C/text%3E%3Ccircle fill='%23D8D8D8' cx='1' cy='69' r='1'/%3E%3Ccircle fill='%23D8D8D8' cx='1' cy='81' r='1'/%3E%3Cpath fill='%23D8D8D8' d='M0 39h1v18H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
