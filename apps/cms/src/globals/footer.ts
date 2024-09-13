import { triggerDeploy } from "./hooks/trigger-deploy"
import { link } from "@/fields/link"

import type { GlobalConfig } from "payload"

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
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
