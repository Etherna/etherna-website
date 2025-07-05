import type { User } from "@payload-types"
import type { Access } from "payload"

const webDesignPermissions: User["policies"] = ["administrator", "webDesigner"]

export const webDesigner = ((args) => {
  const user = args.req.user
  if (!user) return false
  if (!user.policies.some((policy) => webDesignPermissions.includes(policy))) return false
  return true
}) satisfies Access
