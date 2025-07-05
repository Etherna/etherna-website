import type { CollectionBeforeChangeHook } from "payload"

export const populatePublishedAt: CollectionBeforeChangeHook = ({ operation, req, data }) => {
  if (operation === "create" || operation === "update") {
    if (req.data && !req.data.publishedAt) {
      return {
        ...data,
        publishedAt: new Date(),
      }
    }
  }
  return data
}
