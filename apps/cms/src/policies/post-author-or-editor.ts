import { admin } from "./admin"
import { postEditor } from "./post-editor"

import type { Access } from "payload"

export const postAuthorOrEditor = ((args) => {
  const user = args.req.user

  if (!user) return false
  if (admin(args)) return true
  if (postEditor(args)) return true

  return {
    authors: {
      contains: user.id,
    },
  }
}) satisfies Access
