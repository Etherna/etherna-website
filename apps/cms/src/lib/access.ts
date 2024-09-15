import type { Access, FieldAccess } from "payload"

export function someAccess(...access: Access[]): Access {
  return async (args) => {
    const results = await Promise.all(access.map(async (policy) => await policy(args)))
    const whereResults = results.filter((result) => typeof result === "object")
    const boolResults = results.filter((result) => typeof result === "boolean")
    return boolResults.some((res) => res) || whereResults.length > 0
      ? {
          or: [...whereResults],
        }
      : false
  }
}

export function everyAccess(...access: Access[]): Access {
  return async (args) => {
    const results = await Promise.all(access.map(async (policy) => await policy(args)))
    const whereResults = results.filter((result) => typeof result === "object")
    const boolResults = results.filter((result) => typeof result === "boolean")
    return boolResults.every((res) => res) || whereResults.length > 0
      ? {
          and: [...whereResults],
        }
      : false
  }
}

export function someFieldAccess(...access: FieldAccess[]): FieldAccess {
  return async (args) => {
    const results = await Promise.all(access.map(async (policy) => await policy(args)))
    return results.some((res) => res)
  }
}

export function everyFieldAccess(...access: FieldAccess[]): FieldAccess {
  return async (args) => {
    const results = await Promise.all(access.map(async (policy) => await policy(args)))
    return results.every((res) => res)
  }
}
