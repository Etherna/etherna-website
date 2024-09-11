import { anyone } from "../access/anyone"
import { authenticated } from "../access/authenticated"
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
    {
      name: "color",
      type: "text",
      required: false,
      minLength: 4,
      maxLength: 7,
    },
    ...slugField(),
  ],
}
