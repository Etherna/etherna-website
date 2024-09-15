import { triggerDeploy } from "./hooks/trigger-deploy"
import { someAccess } from "@/lib/access"
import { admin } from "@/policies/admin"
import { authenticated } from "@/policies/authenticated"
import { webDesigner } from "@/policies/web-designer"

import type { GlobalConfig } from "payload"

export const Company: GlobalConfig = {
  slug: "company",
  access: {
    read: authenticated,
    readDrafts: someAccess(admin, webDesigner),
    readVersions: someAccess(admin, webDesigner),
    update: someAccess(admin, webDesigner),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Socials",
          fields: [
            {
              name: "socials",
              type: "array",
              fields: [
                {
                  name: "social",
                  type: "select",
                  required: true,
                  options: [
                    {
                      label: "Facebook",
                      value: "facebook",
                    },
                    {
                      label: "Twitter",
                      value: "twitter",
                    },
                    {
                      label: "Instagram",
                      value: "instagram",
                    },
                    {
                      label: "LinkedIn",
                      value: "linkedin",
                    },
                    {
                      label: "GitHub",
                      value: "github",
                    },
                    {
                      label: "YouTube",
                      value: "youtube",
                    },
                    {
                      label: "Pinterest",
                      value: "pinterest",
                    },
                    {
                      label: "TikTok",
                      value: "tiktok",
                    },
                    {
                      label: "Snapchat",
                      value: "snapchat",
                    },
                    {
                      label: "Telegram",
                      value: "telegram",
                    },
                    {
                      label: "Signal",
                      value: "signal",
                    },
                    {
                      label: "Discord",
                      value: "discord",
                    },
                    {
                      label: "Twitch",
                      value: "twitch",
                    },
                    {
                      label: "Reddit",
                      value: "reddit",
                    },
                  ],
                },
                {
                  name: "link",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Company Info",
          fields: [
            {
              name: "companyName",
              type: "text",
              required: true,
            },
            {
              name: "companyEmail",
              type: "text",
              required: true,
            },
            {
              name: "companyFoundedDate",
              type: "date",
              required: true,
              admin: {
                date: {
                  pickerAppearance: "default",
                },
                position: "sidebar",
              },
            },
            {
              name: "companyAddress",
              type: "group",
              fields: [
                {
                  name: "streetAddress",
                  type: "text",
                  required: true,
                },
                {
                  name: "state",
                  type: "text",
                  required: true,
                },
                {
                  name: "zip",
                  type: "text",
                  required: true,
                },
                {
                  name: "country",
                  type: "text",
                  required: true,
                  maxLength: 2,
                  hooks: {
                    beforeValidate: [({ value }) => (value ? value.toUpperCase() : value)],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [triggerDeploy],
  },
}
