import { TextBlock } from "./text-block"

import type { Block } from "payload"

export const TeamBlock = {
  slug: "teams",
  labels: {
    singular: "Teams",
    plural: "Teams Blocks",
  },
  interfaceName: "TeamBlock",
  fields: [
    ...TextBlock.fields,
    {
      name: "members",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          required: false,
        },
        {
          name: "role",
          type: "text",
          required: false,
        },
        {
          name: "bio",
          type: "richText",
          required: false,
        },
        {
          name: "photo",
          type: "upload",
          relationTo: "media",
          required: false,
        },
      ],
    },
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cdefs%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__b'%3E%3Cstop stop-color='%23FFF' offset='0%25'/%3E%3Cstop stop-color='%23EAE9E9' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__a'%3E%3Cstop stop-color='%23CECECE' offset='0%25'/%3E%3Cstop stop-color='%23DCDCDC' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Cg fill='%23000'%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' transform='translate(75 26)'%3E%3Ctspan x='35.352' y='11'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' transform='translate(75 26)'%3E%3Ctspan x='.623' y='26'%3ELorem ipsum dolor sit amet, consectetur adipiscing %3C/tspan%3E%3Ctspan x='2.468' y='35'%3Eelit, sed do eiusmod tempor incididunt ut labore et %3C/tspan%3E%3Ctspan x='50.161' y='44'%3Edolore magna aliqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3Crect stroke='url(%23prefix__a)' stroke-width='.5' fill='url(%23prefix__b)' x='41.25' y='95.25' width='26.5' height='25.5' rx='6'/%3E%3Crect stroke='url(%23prefix__a)' stroke-width='.5' fill='url(%23prefix__b)' x='123.25' y='95.25' width='26.5' height='25.5' rx='6'/%3E%3Crect stroke='url(%23prefix__a)' stroke-width='.5' fill='url(%23prefix__b)' x='205.25' y='95.25' width='26.5' height='25.5' rx='6'/%3E%3Ctext font-family='Geist-Regular, Geist' font-size='6' letter-spacing='-.289' fill='%23000'%3E%3Ctspan x='41.24' y='141'%3ELorem ipsum dolor sit amet, %3C/tspan%3E%3Ctspan x='41.24' y='148'%3Econsectetur adipiscing elit%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='6' letter-spacing='-.289' fill='%23000'%3E%3Ctspan x='123.24' y='141'%3ELorem ipsum dolor sit amet, %3C/tspan%3E%3Ctspan x='123.24' y='148'%3Econsectetur adipiscing elit%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='6' letter-spacing='-.289' fill='%23000'%3E%3Ctspan x='205.24' y='141'%3ELorem ipsum dolor sit amet, %3C/tspan%3E%3Ctspan x='205.24' y='148'%3Econsectetur adipiscing elit%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='8' font-weight='bold' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='41' y='132'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='8' font-weight='bold' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='123' y='132'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='8' font-weight='bold' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='205' y='132'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Cpath fill='%23000' opacity='.401' d='M54.495 101.456l-2.939 2.089 1.079-3.44-2.895-2.15 3.605-.038 1.15-3.417 1.15 3.417 3.606.038-2.895 2.15 1.078 3.44zM136.495 110.456l-2.939 2.089 1.079-3.44-2.895-2.15 3.605-.038 1.15-3.417 1.15 3.417 3.606.038-2.895 2.15 1.078 3.44zM218.495 110.456l-2.939 2.089 1.079-3.44-2.895-2.15 3.605-.038 1.15-3.417 1.15 3.417 3.606.038-2.895 2.15 1.078 3.44z'/%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
