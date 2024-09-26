import type { BundledUploadFields } from "@/lib/bundle"

declare module "@payload-types" {
  interface Media {
    bundled?: BundledUploadFields
  }
}
