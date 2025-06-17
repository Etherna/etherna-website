import { globalTriggerDeploy } from "../hooks/global-trigger-deploy"
import { link } from "@/fields/link"
import { linkGroup } from "@/fields/link-group"
import { anyone } from "@/policies/anyone"
import { webDesigner } from "@/policies/web-designer"

import type { GlobalConfig } from "payload"

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: anyone,
    readDrafts: webDesigner,
    readVersions: webDesigner,
    update: webDesigner,
  },
  fields: [
    {
      name: "groups",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "groupItems",
          type: "array",
          fields: [
            link({
              appearances: false,
              sublinks: false,
              icon: false,
            }),
          ],
          maxRows: 10,
        },
      ],
      maxRows: 4,
    },
    linkGroup({
      overrides: {
        name: "legalLinks",
      },
      linkOptions: { appearances: false },
    }),
  ],
  hooks: {
    afterChange: [globalTriggerDeploy],
  },
}
