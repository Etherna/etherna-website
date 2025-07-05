import { postEditor } from "@/policies/post-editor"

import type { GlobalConfig } from "payload"

export const Prompts: GlobalConfig = {
  slug: "prompts",
  label: "AI Prompts",
  access: {
    read: postEditor,
    readDrafts: postEditor,
    readVersions: postEditor,
    update: postEditor,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Base requirements",
          fields: [
            {
              name: "articlePrompt",
              type: "textarea",
              label: false,
            },
          ],
        },
        {
          label: "Variants",
          fields: [
            {
              name: "variants",
              type: "array",
              label: false,
              // admin: {
              //   initCollapsed: true,
              //   components: {
              //     RowLabel: {
              //       path: "@/fields/row-label/component",
              //       clientProps: {
              //         useAsTitle: "name",
              //       },
              //     },
              //   },
              // },
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Variant Name",
                },
                {
                  name: "prompt",
                  type: "textarea",
                  label: "Prompt",
                },
                {
                  name: "context",
                  type: "array",
                  label: "Context",
                  // admin: {
                  //   initCollapsed: true,
                  //   components: {
                  //     RowLabel: {
                  //       path: "@/fields/row-label/component",
                  //       clientProps: {
                  //         useAsTitle: "type",
                  //       },
                  //     },
                  //   },
                  // },
                  fields: [
                    {
                      name: "type",
                      type: "radio",
                      admin: {
                        layout: "horizontal",
                        width: "33%",
                      },
                      defaultValue: "reference",
                      options: [
                        {
                          label: "Attachment",
                          value: "attachment",
                        },
                        {
                          label: "URL",
                          value: "url",
                        },
                      ],
                    },
                    {
                      name: "attachment",
                      type: "relationship",
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === "attachment",
                      },
                      label: "Attachment",
                      maxDepth: 1,
                      relationTo: "media",
                      required: true,
                      filterOptions: () => {
                        return {
                          or: [
                            { mimeType: { like: "application/" } },
                            { mimeType: { like: "text/" } },
                          ],
                        }
                      },
                    },
                    {
                      name: "url",
                      type: "text",
                      label: "URL",
                      required: true,
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === "url",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
