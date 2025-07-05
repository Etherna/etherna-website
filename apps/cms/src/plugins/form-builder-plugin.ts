import { formBuilderPlugin } from "@payloadcms/plugin-form-builder"
import { HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical"

import { env } from "@/env"
import { createLead } from "@/hooks/create-lead"
import { admin } from "@/policies/admin"
import { anyone } from "@/policies/anyone"

import type { Block, Field } from "payload"

export const formBuilder = formBuilderPlugin({
  fields: {
    payment: false,
    country: false,
    state: false,
  },
  defaultToEmail: env.PAYLOAD_EMAIL_DEFAULT_RECEIVER,
  redirectRelationships: ["pages", "posts"],
  formSubmissionOverrides: {
    access: {
      admin: admin,
      create: anyone,
      read: admin,
      update: admin,
      delete: admin,
      readVersions: admin,
      unlock: admin,
    },
    hooks: {
      beforeChange: [createLead],
    },
  },
  formOverrides: {
    fields: ({ defaultFields }) => {
      return [
        ...defaultFields.map((field) => {
          if ("name" in field && field.name === "confirmationMessage") {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                  ]
                },
              }),
            }
          }
          if ("name" in field && field.name === "fields" && field.type === "blocks") {
            return {
              ...field,
              blocks: [
                ...field.blocks,
                {
                  slug: "acceptance",
                  labels: {
                    singular: "Acceptance",
                    plural: "Acceptances",
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "name",
                          type: "text",
                          label: "Name (lowercase, no special characters)",
                          required: true,
                          admin: { width: "50%" },
                        },
                        {
                          name: "label",
                          type: "richText",
                          label: "Label",
                          editor: lexicalEditor(),
                          localized: true,
                          admin: { width: "50%" },
                        },
                      ],
                    },
                    {
                      type: "row",
                      fields: [
                        {
                          name: "width",
                          type: "number",
                          label: "Field Width (percentage)",
                          admin: { width: "50%" },
                        },
                        { name: "required", type: "checkbox", label: "Required" },
                      ],
                    },
                  ],
                } satisfies Block,
              ],
            }
          }
          return field
        }),
        {
          name: "event",
          type: "select",
          defaultValue: "submission",
          options: [
            {
              value: "submission",
              label: "Submission",
            },
            {
              value: "registration",
              label: "Registration",
            },
          ],
        } satisfies Field,
        {
          name: "mailchimpList",
          type: "text",
          required: true,
          admin: {
            condition: ({ event }) => event === "registration",
            width: "50%",
          },
        } satisfies Field,
        {
          name: "mailchimpTags",
          type: "text",
          admin: {
            condition: ({ event }) => event === "registration",
            placeholder: "comma (,) separated tags",
            width: "50%",
          },
        } satisfies Field,
      ]
    },
  },
})
