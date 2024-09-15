import type { Access } from "payload"

export const published: Access = () => {
  return {
    _status: {
      equals: "published",
    },
    publishedAt: {
      less_than_equal: new Date().toISOString(),
    },
  }
}
