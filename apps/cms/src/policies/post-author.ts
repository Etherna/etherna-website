import type { Access } from "payload"

export const postAuthor: Access = (args) => {
  if (!args.req.user) {
    return false
  }

  return {
    or: [
      {
        id: {
          equals: -1,
        },
      },
      {
        id: {
          equals: -2,
        },
      },
    ],
  }
}
