import type { Access, FieldAccess } from "payload"

export const admin: Access = (args) => {
  return args.req.user?.policies.includes("administrator") ?? false
}

export const field_admin: FieldAccess = (args) => {
  return args.req.user?.policies.includes("administrator") ?? false
}
