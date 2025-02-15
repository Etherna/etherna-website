import type { AccessArgs, FieldAccess } from "payload"

export const authenticated = ({ req: { user } }: AccessArgs) => {
  return Boolean(user)
}

export const field_authenticated = ((args) => {
  return Boolean(args.req.user)
}) satisfies FieldAccess
