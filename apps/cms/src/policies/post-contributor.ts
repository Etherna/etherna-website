import type { Access } from "payload"

export const postContributor: Access = (args) => {
  if (!args.req.user) return false
  return args.req.user.policies.includes("postsContributor")
}
