import type { Access, FieldAccess } from "payload"

export const admin = ((args) => {
  if (!args.req.user?.policies) return false
  return args.req.user.policies.includes("administrator")
}) satisfies Access

export const field_admin = ((args) => {
  if (!args.req.user?.policies) return false
  return args.req.user.policies.includes("administrator")
}) satisfies FieldAccess
