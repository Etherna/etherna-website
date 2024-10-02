import type { Validate } from "payload"
import type { Media } from "payload-types"

export const validateMimeTypes =
  (accept: string[]): Validate =>
  async (value, { req }) => {
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
