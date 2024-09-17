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
    fields: [
      link({
        ...linkOptions,
      }),
    ],
  } satisfies Field

  return deepMerge(generatedLinkGroup, overrides)
}
