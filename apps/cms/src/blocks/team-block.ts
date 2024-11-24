import { TextBlock } from "./text-block"

import type { Block } from "payload"

export const TeamBlock = {
  slug: "team",
  labels: {
    singular: "Team",
    plural: "Team Blocks",
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
          localized: true,
        },
        {
          name: "bio",
          type: "richText",
          required: false,
          localized: true,
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
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 320 180'%3E%3Cdefs%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__b'%3E%3Cstop stop-color='%23FFF' offset='0%25'/%3E%3Cstop stop-color='%23EAE9E9' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__a'%3E%3Cstop stop-color='%23CECECE' offset='0%25'/%3E%3Cstop stop-color='%23DCDCDC' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__c'%3E%3Cstop stop-color='%23EAE9E9' offset='0%25'/%3E%3Cstop stop-color='%23FFF' offset='100%25'/%3E%3C/linearGradient%3E%3Cfilter x='-.4%25' y='-.7%25' width='100.7%25' height='101.3%25' filterUnits='objectBoundingBox' id='prefix__e'%3E%3CfeMorphology radius='.5' operator='dilate' in='SourceAlpha' result='shadowSpreadInner1'/%3E%3CfeOffset dy='-1' in='shadowSpreadInner1' result='shadowOffsetInner1'/%3E%3CfeComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'/%3E%3CfeColorMatrix values='0 0 0 0 0.700747283 0 0 0 0 0.700747283 0 0 0 0 0.700747283 0 0 0 0.5 0' in='shadowInnerInner1'/%3E%3C/filter%3E%3Cfilter x='-.4%25' y='-.7%25' width='100.7%25' height='101.3%25' filterUnits='objectBoundingBox' id='prefix__g'%3E%3CfeMorphology radius='.5' operator='dilate' in='SourceAlpha' result='shadowSpreadInner1'/%3E%3CfeOffset dy='-1' in='shadowSpreadInner1' result='shadowOffsetInner1'/%3E%3CfeComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'/%3E%3CfeColorMatrix values='0 0 0 0 0.700747283 0 0 0 0 0.700747283 0 0 0 0 0.700747283 0 0 0 0.5 0' in='shadowInnerInner1'/%3E%3C/filter%3E%3Cfilter x='-.4%25' y='-.7%25' width='100.7%25' height='101.3%25' filterUnits='objectBoundingBox' id='prefix__i'%3E%3CfeMorphology radius='.5' operator='dilate' in='SourceAlpha' result='shadowSpreadInner1'/%3E%3CfeOffset dy='-1' in='shadowSpreadInner1' result='shadowOffsetInner1'/%3E%3CfeComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'/%3E%3CfeColorMatrix values='0 0 0 0 0.700747283 0 0 0 0 0.700747283 0 0 0 0 0.700747283 0 0 0 0.5 0' in='shadowInnerInner1'/%3E%3C/filter%3E%3Cpath d='M5.5 0h56A5.5 5.5 0 0167 5.5V38H0V5.5A5.5 5.5 0 015.5 0z' id='prefix__d'/%3E%3Cpath d='M5.5 0h56A5.5 5.5 0 0167 5.5V38H0V5.5A5.5 5.5 0 015.5 0z' id='prefix__f'/%3E%3Cpath d='M5.5 0h56A5.5 5.5 0 0167 5.5V38H0V5.5A5.5 5.5 0 015.5 0z' id='prefix__h'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Cg fill='%23000'%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' transform='translate(75 26)'%3E%3Ctspan x='35.352' y='11'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' transform='translate(75 26)'%3E%3Ctspan x='.623' y='26'%3ELorem ipsum dolor sit amet, consectetur adipiscing %3C/tspan%3E%3Ctspan x='2.468' y='35'%3Eelit, sed do eiusmod tempor incididunt ut labore et %3C/tspan%3E%3Ctspan x='50.161' y='44'%3Edolore magna aliqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3Crect stroke='url(%23prefix__a)' stroke-width='.5' fill='url(%23prefix__b)' x='44.25' y='90.25' width='67.5' height='64.981' rx='6'/%3E%3Cg transform='translate(44.5 90.5)'%3E%3Cuse fill='url(%23prefix__c)' xlink:href='%23prefix__d'/%3E%3Cuse fill='%23000' filter='url(%23prefix__e)' xlink:href='%23prefix__d'/%3E%3C/g%3E%3Cg transform='translate(71 100)' stroke='%237D7D7D' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2'/%3E%3Ccircle cx='7' cy='4' r='4'/%3E%3C/g%3E%3Crect stroke='url(%23prefix__a)' stroke-width='.5' fill='url(%23prefix__b)' x='126.25' y='90.25' width='67.5' height='64.981' rx='6'/%3E%3Cg transform='translate(126.5 90.5)'%3E%3Cuse fill='url(%23prefix__c)' xlink:href='%23prefix__f'/%3E%3Cuse fill='%23000' filter='url(%23prefix__g)' xlink:href='%23prefix__f'/%3E%3C/g%3E%3Cg transform='translate(153 100)' stroke='%237D7D7D' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2'/%3E%3Ccircle cx='7' cy='4' r='4'/%3E%3C/g%3E%3Crect stroke='url(%23prefix__a)' stroke-width='.5' fill='url(%23prefix__b)' x='208.25' y='90.25' width='67.5' height='64.981' rx='6'/%3E%3Cg transform='translate(208.5 90.5)'%3E%3Cuse fill='url(%23prefix__c)' xlink:href='%23prefix__h'/%3E%3Cuse fill='%23000' filter='url(%23prefix__i)' xlink:href='%23prefix__h'/%3E%3C/g%3E%3Cg transform='translate(235 100)' stroke='%237D7D7D' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2'/%3E%3Ccircle cx='7' cy='4' r='4'/%3E%3C/g%3E%3Ctext font-family='Geist-Regular, Geist' font-size='6' letter-spacing='-.289' fill='%23000'%3E%3Ctspan x='52.24' y='148'%3ECEO%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='6' letter-spacing='-.289' fill='%23000'%3E%3Ctspan x='134.24' y='148'%3ECFO%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='6' letter-spacing='-.289' fill='%23000'%3E%3Ctspan x='216.24' y='148'%3ECOO%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='8' font-weight='bold' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='52' y='139'%3EBansilal Brata%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='8' font-weight='bold' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='134' y='139'%3EZhan Huo%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Bold, Geist' font-size='8' font-weight='bold' letter-spacing='-.385' fill='%23000'%3E%3Ctspan x='216' y='139'%3ESakane Miiko%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
