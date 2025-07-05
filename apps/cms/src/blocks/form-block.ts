import { TextBlock } from "./text-block"

import type { Block } from "payload"

export const FormBlock = {
  slug: "form",
  interfaceName: "FormBlock",
  labels: {
    singular: "Form",
    plural: "Form Block",
  },
  fields: [
    ...TextBlock.fields,
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
    },
  ],
  imageURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Cdefs%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__a'%3E%3Cstop stop-color='%23C1C1C1' offset='0%25'/%3E%3Cstop stop-color='%23777' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__b'%3E%3Cstop stop-color='%23B0E4EA' offset='0%25'/%3E%3Cstop stop-color='%2300AABD' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='prefix__c'%3E%3Cstop stop-color='%23C1C1C1' offset='0%25'/%3E%3Cstop stop-color='%23777' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23F7F7F7' d='M0 0h320v180H0z'/%3E%3Cg fill='%23000'%3E%3Ctext font-family='Geist-Bold, Geist' font-size='12' font-weight='bold' letter-spacing='-.577' transform='translate(28 68)'%3E%3Ctspan x='.352' y='11'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='8' letter-spacing='-.385' transform='translate(28 68)'%3E%3Ctspan x='0' y='24'%3ELorem ipsum dolor sit amet, consectetur %3C/tspan%3E%3Ctspan x='0' y='33'%3Eadipiscing elit, sed do eiusmod tempor %3C/tspan%3E%3Ctspan x='0' y='42'%3Eincididunt ut labore et dolore magna %3C/tspan%3E%3Ctspan x='0' y='51'%3Ealiqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3Crect stroke='url(%23prefix__a)' stroke-width='.5' x='192.25' y='37.25' width='102.5' height='19.5' rx='4'/%3E%3Crect fill='url(%23prefix__b)' x='192' y='123' width='103' height='20' rx='4'/%3E%3Crect stroke='url(%23prefix__c)' stroke-width='.5' x='192.25' y='64.25' width='102.5' height='52.5' rx='4'/%3E%3Ctext font-family='Geist-Regular, Geist' font-size='7' letter-spacing='-.337' fill='%23000'%3E%3Ctspan x='199' y='49'%3ELorem ipsum dolor%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Medium, Geist' font-size='7' font-weight='400' letter-spacing='-.337' fill='%23FFF'%3E%3Ctspan x='233' y='135'%3ESubmit%3C/tspan%3E%3C/text%3E%3Ctext font-family='Geist-Regular, Geist' font-size='7' letter-spacing='-.337' fill='%23000'%3E%3Ctspan x='199' y='76'%3ELorem ipsum dolor sit amet, %3C/tspan%3E%3Ctspan x='199' y='84'%3Econsectetur adipiscing elit, %3C/tspan%3E%3Ctspan x='199' y='92'%3Esed do eiusmod tempor %3C/tspan%3E%3Ctspan x='199' y='100'%3Eincididunt ut labore et dolore %3C/tspan%3E%3Ctspan x='199' y='108'%3Emagna aliqua. %3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E",
} as const satisfies Block
