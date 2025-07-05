import type { Media } from "@payload-types"
import type { Validate } from "payload"

export const validateMimeTypes =
  (accept: string[]): Validate =>
  async (value, { req, required }) => {
    if (!required) {
      return true
    }

    const img =
      typeof value === "object"
        ? (value as Media)
        : await req.payload.findByID({
            collection: "media",
            id: value,
          })

    return (
      accept.includes(img.mimeType ?? "") || `Invalid file type. Allowed are: ${accept.join(", ")}`
    )
  }
