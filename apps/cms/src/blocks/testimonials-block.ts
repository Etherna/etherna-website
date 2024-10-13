import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { TextBlock } from "./text-block"
import { validateMimeTypes } from "@/collections/validations/validate-mime-types"
import { link } from "@/fields/link"

import type { Block } from "payload"

export const TestimonialsBlock = {
  slug: "testimonials",
  interfaceName: "TestimonialsBlock",
  labels: {
    singular: "Testimonials",
    plural: "Testimonials Block",
  },
  fields: [
    ...TextBlock.fields,
    {
      name: "testimonials",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "role",
          type: "text",
          required: true,
        },
        {
          name: "quote",
          type: "richText",
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures]
            },
          }),
        },
        {
          name: "avatar",
          type: "upload",
          relationTo: "media",
          validate: validateMimeTypes(["image/png", "image/jpg", "image/jpeg"]),
        },
        link({ required: false, disableLabel: true, appearances: false }),
      ],
    },
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cdefs%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__a'%3E%3Cstop stop-color='%23B5B5B5' offset='0%25'/%3E%3Cstop stop-color='%23F0F0F0' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__b'%3E%3Cstop stop-color='%232E2E2E' offset='0%25'/%3E%3Cstop stop-color='%23D8D8D8' stop-opacity='.215' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Cg fill='%23000'%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' transform='translate(75 26)'%3E%3Ctspan x='35.352' y='11'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' transform='translate(75 26)'%3E%3Ctspan x='.623' y='26'%3ELorem ipsum dolor sit amet, consectetur adipiscing %3C/tspan%3E%3Ctspan x='2.468' y='35'%3Eelit, sed do eiusmod tempor incididunt ut labore et %3C/tspan%3E%3Ctspan x='50.161' y='44'%3Edolore magna aliqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3Crect stroke='url(%23prefix__a)' x='41.5' y='86.5' width='67' height='53' rx='8'/%3E%3Crect stroke='url(%23prefix__a)' x='126.5' y='86.5' width='67' height='53' rx='8'/%3E%3Crect stroke='url(%23prefix__a)' x='211.5' y='86.5' width='67' height='53' rx='8'/%3E%3Ctext font-family='Geist-Regular, Geist' font-size='6' letter-spacing='-.289' fill='%23000'%3E%3Ctspan x='49.24' y='131'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='6' letter-spacing='-.289' fill='%23000'%3E%3Ctspan x='134.24' y='131'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='6' letter-spacing='-.289' fill='%23000'%3E%3Ctspan x='219.24' y='131'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='8' font-weight='bold' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='49' y='122'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='8' font-weight='bold' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='134' y='122'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='8' font-weight='bold' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='219' y='122'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Cpath d='M53.9 102.85h3.25v7.65h-8.1v-6.85l3.45-8.7h4.1l-2.7 7.9zm10.75 0h3.25v7.65h-8.1v-6.85l3.45-8.7h4.1l-2.7 7.9zM138.9 102.85h3.25v7.65h-8.1v-6.85l3.45-8.7h4.1l-2.7 7.9zm10.75 0h3.25v7.65h-8.1v-6.85l3.45-8.7h4.1l-2.7 7.9zM223.9 102.85h3.25v7.65h-8.1v-6.85l3.45-8.7h4.1l-2.7 7.9zm10.75 0h3.25v7.65h-8.1v-6.85l3.45-8.7h4.1l-2.7 7.9z' fill='url(%23prefix__b)' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
