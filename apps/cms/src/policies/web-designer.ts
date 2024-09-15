import type { Access } from "payload"

export const webDesigner: Access = (args) => {
  if (!args.req.user) return false
  return args.req.user.policies.includes("webDesigner")
}
