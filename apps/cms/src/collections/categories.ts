import { colorField } from "@/fields/color"
import { slugField } from "@/fields/slug"
import { anyone } from "@/policies/anyone"
import { authenticated } from "@/policies/authenticated"
import { postEditor } from "@/policies/post-editor"

import type { CollectionConfig } from "payload"

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    admin: authenticated,
    create: postEditor,
    delete: postEditor,
    read: anyone,
    readVersions: postEditor,
    update: postEditor,
    unlock: postEditor,
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
  hooks: {
    beforeRead: [
      async ({ req, doc }) => {
        if (req.searchParams.has("postsCount")) {
          const posts = await req.payload.count({
            collection: "posts",
            where: {
              categories: {
                contains: doc.id,
              },
            },
          })

          doc.postsCount = posts.totalDocs
        }

        return doc
      },
    ],
  },
}
