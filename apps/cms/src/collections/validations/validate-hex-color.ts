import type { Validate } from "payload"

export const validateHexColor: Validate = (value, { required }) => {
  if (required && !value) {
    return "This field is required"
  }
  if (!required && !value) {
    return true
  }

  const color = (value ?? "").replace(/^#/, "")

  if (color.length !== 3 && color.length !== 6) {
    return "Invalid color"
  }

  return true
}
