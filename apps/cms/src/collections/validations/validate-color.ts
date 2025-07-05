import type { Validate } from "payload"

export const validateColor: Validate = (value, { required }) => {
  if (required && !value) {
    return "This field is required"
  }
  if (!required && !value) {
    return true
  }

  if (/var\(.+\)/.test(value)) {
    return true
  }

  if (/hsl\(.+\)/.test(value)) {
    return true
  }

  const color = (value ?? "").replace(/^#/, "")

  if (color.length !== 3 && color.length !== 6) {
    return "Invalid color"
  }

  return true
}
