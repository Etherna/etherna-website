import { getThumbhash } from "@/lib/thumbhash"

import type { CollectionBeforeChangeHook } from "payload"
import type { Media } from "payload-types"

export const createThumbhash: CollectionBeforeChangeHook<Media> = async ({
  operation,
  req,
  data,
}) => {
  if (operation === "create" && req.file && req.file.mimetype.startsWith("image")) {
    const { width, height } = data

    data.thumbhash = await getThumbhash(req.file.data, width ?? 100, height ?? 100)

    return data
  }

  return data
}
