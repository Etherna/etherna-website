import { triggerDeploy } from "./hooks/trigger-deploy"
import { link } from "@/fields/link"

import type { GlobalConfig } from "payload"

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
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
