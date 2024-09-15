import { triggerDeploy } from "./hooks/trigger-deploy"
import { link } from "@/fields/link"
import { someAccess } from "@/lib/access"
import { admin } from "@/policies/admin"
import { authenticated } from "@/policies/authenticated"
import { webDesigner } from "@/policies/web-designer"

import type { GlobalConfig } from "payload"

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: authenticated,
    readDrafts: someAccess(admin, webDesigner),
    readVersions: someAccess(admin, webDesigner),
    update: someAccess(admin, webDesigner),
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
  ],
  hooks: {
    afterChange: [triggerDeploy],
  },
}
