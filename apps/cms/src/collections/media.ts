import path from "path"
import { fileURLToPath } from "url"
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

import { anyone } from "@/access/anyone"
import { authenticated } from "@/access/authenticated"

import type { CollectionConfig } from "payload"
import { Media } from "payload-types"
import { updateBlurhash } from "./hooks/update-blurhash"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: "blurhash",
      type: "text",
      required: false,
      hooks: {
        beforeChange: [
          updateBlurhash
        ],
      },
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
  },
}
