import { redirectsPlugin } from "@payloadcms/plugin-redirects"

import { triggerDeploy } from "@/hooks/trigger-deploy"

import type { Field } from "payload"

export const redirects = redirectsPlugin({
  collections: ["pages", "posts"],
  overrides: {
    admin: {
      useAsTitle: "from",
    },
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ("name" in field && field.name === "from") {
          return {
            ...field,
            admin: {
              description: "You will need to rebuild the website when changing this field.",
            },
          } as Field
        }
        return field
      })
    },
    hooks: {
      afterChange: [triggerDeploy],
    },
  },
})
