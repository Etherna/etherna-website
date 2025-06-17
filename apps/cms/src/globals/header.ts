import { globalTriggerDeploy } from "../hooks/global-trigger-deploy"
import { link } from "@/fields/link"
import { anyone } from "@/policies/anyone"
import { webDesigner } from "@/policies/web-designer"

import type { GlobalConfig } from "payload"

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: anyone,
    readDrafts: webDesigner,
    readVersions: webDesigner,
    update: webDesigner,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
          sublinks: true,
          icon: true,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [globalTriggerDeploy],
  },
}
