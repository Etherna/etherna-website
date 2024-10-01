import type { Access, FieldAccess } from "payload"

export const admin = ((args) => {
  return args.req.user?.policies.includes("administrator") ?? false
}) satisfies Access

export const field_admin: FieldAccess = (args) => {
  return args.req.user?.policies.includes("administrator") ?? false
}
