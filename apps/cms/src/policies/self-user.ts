import type { Access, FieldAccess } from "payload"

export const selfUser: Access = (args) => {
  return !!args.id && !!args.req.user && +args.id === args.req.user.id
}

export const field_selfUser: FieldAccess = (args) => {
  return !!args.id && !!args.req.user && +args.id === args.req.user.id
}
