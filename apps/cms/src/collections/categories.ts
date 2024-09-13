import { anyone } from "../access/anyone"
import { authenticated } from "../access/authenticated"
import { colorField } from "@/fields/color"
import { slugField } from "@/fields/slug"

import type { CollectionConfig } from "payload"

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    colorField(),
    ...slugField(),
  ],
}
