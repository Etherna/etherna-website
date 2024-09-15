import path from "path"
import { fileURLToPath } from "url"
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

import { anyone } from "@/policies/anyone"
import { authenticated } from "@/policies/authenticated"

import type { CollectionConfig } from "payload"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: anyone,
    readVersions: authenticated,
    update: authenticated,
    unlock: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: false,
    },
    {
      name: "caption",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
  },
}
