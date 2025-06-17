import { lexicalEditor } from "@payloadcms/richtext-lexical"

import { deepMerge } from "@/lib/objects"

import type { CollapsibleField } from "payload"

export const heading = (overrides?: Partial<CollapsibleField>) =>
  deepMerge(
    {
      label: "Heading",
      type: "collapsible",
      admin: {
        initCollapsed: true,
        components: {
          Label: {
            path: "@/fields/collapse-label/component",
            clientProps: {
              useAsTitle: "{heading}: {title}",
            },
          },
        },
        ...overrides?.admin,
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "title",
              type: "text",
              localized: true,
              required: false,
              admin: {
                width: "70%",
              },
            },
            {
              name: "heading",
              type: "select",
              required: true,
              defaultValue: "h2",
              options: [
                { label: "H2", value: "h2" },
                { label: "H3", value: "h3" },
                { label: "H4", value: "h4" },
              ],
            },
          ],
        },
        {
          name: "subtitle",
          type: "text",
          localized: true,
          required: false,
        },
        {
          name: "text",
          type: "richText",
          localized: true,
          required: false,
          editor: lexicalEditor(),
        },
        {
          type: "row",
          fields: [
            {
              name: "titleSize",
              type: "select",
              required: false,
              options: [
                { label: "Smaller", value: "xs" },
                { label: "Small", value: "sm" },
                { label: "Default", value: "default" },
                { label: "Large", value: "lg" },
              ],
              admin: {
                width: "30%",
              },
            },
            {
              name: "centered",
              type: "checkbox",
              required: false,
              defaultValue: false,
              admin: {
                width: "30%",
              },
            },
            {
              name: "forceFullWidth",
              type: "checkbox",
              required: false,
              defaultValue: false,
              admin: {
                width: "30%",
              },
            },
          ],
        },
      ],
    } satisfies CollapsibleField,
    overrides ?? {},
  )
