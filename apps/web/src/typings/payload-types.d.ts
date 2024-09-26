import type { BundledUploadFields } from "@/utils/bundle"

declare module "@payload-types" {
  interface Media {
    bundled?: BundledUploadFields
  }
}
