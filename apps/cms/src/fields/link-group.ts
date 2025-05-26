import { link } from "./link"
import { deepMerge } from "@/lib/objects"

import type { LinkOptions } from "./link"
import type { ArrayField, Field } from "payload"

type LinkGroupType = (options?: {
  overrides?: Partial<ArrayField>
  linkOptions?: LinkOptions
}) => Field

export const linkGroup: LinkGroupType = ({ overrides = {}, linkOptions } = {}) => {
  const generatedLinkGroup = {
    name: "links",
    type: "array",
    admin: {
      components: {
        RowLabel: {
          path: "@/fields/row-label/component",
          clientProps: {
            useAsTitle: "link.label",
          },
        },
      },
      initCollapsed: true,
    },
    fields: [
      link({
        ...linkOptions,
      }),
    ],
  } satisfies Field

  const field = deepMerge(generatedLinkGroup, overrides)
  return field
}
