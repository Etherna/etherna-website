import type { User } from "@payload-types"
import type { Access } from "payload"

const contributorPolicies: User["policies"] = ["administrator", "postsEditor", "postsContributor"]

export const postContributor = ((args) => {
  const user = args.req.user
  if (!user) return false
  if (!user.policies.some((policy) => contributorPolicies.includes(policy))) return false
  return true
}) satisfies Access
