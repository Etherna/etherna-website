import { link } from "./link"
import { deepMerge } from "@/lib/objects"

import type { LinkAppearances } from "./link"
import type { ArrayField, Field } from "payload"

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup = {
    name: "links",
    type: "array",
    fields: [
      link({
        appearances,
      }),
    ],
  } satisfies Field

  return deepMerge(generatedLinkGroup, overrides)
}
