import { TextBlock } from "./text-block"

import type { Block } from "payload"

export const RelatedPostsBlock = {
  slug: "relatedPosts",
  interfaceName: "RelatedPostsBlock",
  labels: {
    singular: "Related Posts",
    plural: "Related Posts Block",
  },
  fields: [
    ...TextBlock.fields,
    {
      name: "relatedPosts",
      type: "relationship",
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: true,
      relationTo: "posts",
    },
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 320 180'%3E%3Cdefs%3E%3Crect id='prefix__a' x='46' y='53' width='68' height='54' rx='8'/%3E%3Crect id='prefix__c' x='126' y='53' width='68' height='54' rx='8'/%3E%3Crect id='prefix__d' x='206' y='53' width='68' height='54' rx='8'/%3E%3ClinearGradient x1='4.595%25' y1='20.2%25' x2='95.71%25' y2='80.973%25' id='prefix__b'%3E%3Cstop stop-color='%23FFF' stop-opacity='0' offset='0%25'/%3E%3Cstop stop-color='%2300EDFF' stop-opacity='.104' offset='51.765%25'/%3E%3Cstop stop-color='%23FFF' stop-opacity='0' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__e'%3E%3Cstop stop-color='%23E1E5EF' offset='0%25'/%3E%3Cstop stop-color='%23AFAFAF' offset='50.962%25'/%3E%3Cstop stop-color='%23E1E5EF' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Cuse fill='%23E1E5EF' xlink:href='%23prefix__a'/%3E%3Cuse fill='url(%23prefix__b)' xlink:href='%23prefix__a'/%3E%3Cuse fill='%23E1E5EF' xlink:href='%23prefix__c'/%3E%3Cuse fill='url(%23prefix__b)' xlink:href='%23prefix__c'/%3E%3Cuse fill='%23E1E5EF' xlink:href='%23prefix__d'/%3E%3Cuse fill='url(%23prefix__b)' xlink:href='%23prefix__d'/%3E%3Cpath d='M56.5 58.5v44m15.667-44v44m15.666-44v44m15.667-44v44M136.5 58.5v44m15.667-44v44m15.666-44v44m15.667-44v44M216.5 58.5v44m15.667-44v44m15.666-44v44m15.667-44v44' stroke='url(%23prefix__e)' stroke-width='.5' stroke-linecap='square'/%3E%3Cpath d='M56.5 58.5v44m15.667-44v44m15.666-44v44m15.667-44v44' stroke='url(%23prefix__e)' stroke-width='.5' stroke-linecap='square' transform='rotate(90 80 80.5)'/%3E%3Cpath d='M136.5 58.5v44m15.667-44v44m15.666-44v44m15.667-44v44' stroke='url(%23prefix__e)' stroke-width='.5' stroke-linecap='square' transform='rotate(90 160 80.5)'/%3E%3Cpath d='M216.5 58.5v44m15.667-44v44m15.666-44v44m15.667-44v44' stroke='url(%23prefix__e)' stroke-width='.5' stroke-linecap='square' transform='rotate(90 240 80.5)'/%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='46.24' y='129'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='126.24' y='129'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='206.24' y='129'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='10' font-weight='bold' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='46' y='119'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='10' font-weight='bold' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='126' y='119'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='10' font-weight='bold' letter-spacing='-.481' fill='%23000'%3E%3Ctspan x='206' y='119'%3ELorem ipsum%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
