import { createServerFeature } from "@payloadcms/richtext-lexical"

export const HighlightFeature = createServerFeature({
  feature: {
    ClientFeature: "@/lexical/highlight/highlight-feature.client#HighlightFeatureClient",
  },
  key: "highlight",
})
