import type { Access } from "payload"

export const postEditor: Access = (args) => {
  if (!args.req.user) return false
  return args.req.user.policies.includes("postsEditor")
}
