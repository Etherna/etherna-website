import { colorField } from "@/fields/color"
import { slugField } from "@/fields/slug"
import { someAccess } from "@/lib/access"
import { admin } from "@/policies/admin"
import { anyone } from "@/policies/anyone"
import { authenticated } from "@/policies/authenticated"
import { postEditor } from "@/policies/post-editor"

import type { CollectionConfig } from "payload"

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    admin: authenticated,
    create: someAccess(admin, postEditor),
    delete: someAccess(admin, postEditor),
    read: anyone,
    readVersions: someAccess(admin, postEditor),
    update: someAccess(admin, postEditor),
    unlock: someAccess(admin, postEditor),
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
