import { TextBlock } from "./text-block"
import { linkGroup } from "@/fields/link-group"

import type { Block } from "payload"

export const CtaBlock = {
  slug: "cta",
  interfaceName: "CtaBlock",
  labels: {
    singular: "CTA",
    plural: "CTA Blocks",
  },
  fields: [
    ...TextBlock.fields,
    linkGroup(),
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z' /%3E%3Cg fill='%23000'%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' transform='translate(28 68)'%3E%3Ctspan x='.352' y='11'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' transform='translate(28 68)'%3E%3Ctspan x='0' y='24'%3ELorem ipsum dolor sit amet, consectetur adipiscing %3C/tspan%3E%3Ctspan x='0' y='33'%3Eelit, sed do eiusmod tempor incididunt ut labore et %3C/tspan%3E%3Ctspan x='0' y='42'%3Edolore magna aliqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3Crect fill='%2300AABD' fill-rule='nonzero' x='224.875' y='64' width='68' height='23' rx='4' /%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23FFF'%3E%3Ctspan x='237.317' y='78'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Crect stroke='%23CCC' x='224.875' y='90' width='68' height='23' rx='4' /%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='237.317' y='104'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
