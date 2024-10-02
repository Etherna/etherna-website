import { deepMerge } from "@/lib/objects"

import type { Field, GroupField } from "payload"

export type LinkAppearances = "default" | "outline" | "badge"

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: "Default",
    value: "default",
  },
  outline: {
    label: "Outline",
    value: "outline",
  },
  badge: {
    label: "Badge",
    value: "badge",
  },
}

export interface LinkOptions {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  sublinks?: boolean
  icon?: boolean
  required?: boolean
  overrides?: Partial<GroupField>
}

type LinkType = (options?: LinkOptions) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  sublinks = false,
  icon = false,
  required = true,
  overrides = {},
} = {}) => {
  const linkResult: Field & { type: "group" } = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: "row",
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
                label: "Internal link",
                value: "reference",
              },
              {
                label: "Custom URL",
                value: "custom",
              },
            ],
          },
          {
            name: "newTab",
            label: "Open in new tab",
            type: "checkbox",
            admin: {
              style: {
                alignSelf: "flex-start",
                marginTop: "2rem",
              },
              width: "33%",
            },
          },
        ],
      },
    ],
  }

  if (icon) {
    const rowField = linkResult.fields[0] as Field & { type: "row" }
    rowField.fields.push({
      name: "icon",
      label: "Icon",
      type: "upload",
      relationTo: "media",
      admin: {
        width: "33%",
      },
    })
  }

  const linkTypes: Field[] = [
    {
      name: "reference",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
      },
      label: "Document to link to",
      maxDepth: 1,
      relationTo: ["pages", "posts"],
      required,
    },
    {
      name: "url",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      label: "Custom URL",
      required,
      localized: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: "50%",
      },
    }))

    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          type: "text",
          admin: {
            width: "50%",
          },
          label: "Label",
          required,
          localized: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: "appearance",
      type: "select",
      admin: {
        description: "Choose how the link should be rendered.",
        width: "50%",
      },
      options: appearanceOptionsToUse,
    })
  }

  if (sublinks) {
    linkResult.fields.push({
      name: "sublinks",
      type: "array",
      fields: [link({ appearances, disableLabel, icon, overrides })],
    })
  }

  return deepMerge(linkResult, overrides)
}
