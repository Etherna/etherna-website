import type { Validate } from "payload"
import type { Media } from "payload-types"

export const validateMimeTypes =
  (accept: string[]): Validate =>
  async (value, { req }) => {
    const img =
      typeof value === "number"
        ? await req.payload.findByID({
            collection: "media",
            id: value,
          })
        : (value as Media)

    return (
      accept.includes(img.mimeType ?? "") || `Invalid file type. Allowed are: ${accept.join(", ")}`
    )
  }
