import { triggerDeploy } from "./hooks/trigger-deploy"
import { link } from "@/fields/link"
import { someAccess } from "@/lib/access"
import { admin } from "@/policies/admin"
import { anyone } from "@/policies/anyone"
import { webDesigner } from "@/policies/web-designer"

import type { GlobalConfig } from "payload"

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: anyone,
    readDrafts: someAccess(admin, webDesigner),
    readVersions: someAccess(admin, webDesigner),
    update: someAccess(admin, webDesigner),
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
    afterChange: [triggerDeploy],
  },
}
