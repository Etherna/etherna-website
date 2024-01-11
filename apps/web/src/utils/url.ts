export const serializeObjectSearchParam = (obj: Record<string, unknown>, prefix = ""): string[] => {
  let result: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    console.log(prefix)
    const serializedKey = prefix ? `${prefix}[${key}]` : `[${key.toString()}]`

    if (typeof value === "object" && value !== null) {
      const nested = serializeObjectSearchParam(value as Record<string, unknown>, serializedKey)
      result = result.concat(nested)
    } else {
      result.push(`${serializedKey}=${value}`)
    }
  }

  return result
}
