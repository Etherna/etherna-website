import type { User } from "@payload-types"
import type { Access } from "payload"

const postEditorPolicies: User["policies"] = ["administrator", "postsEditor"]

export const postEditor = ((args) => {
  const user = args.req.user
  if (!user) return false
  if (!user.policies.some((policy) => postEditorPolicies.includes(policy))) return false
  return true
}) satisfies Access
