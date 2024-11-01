import { createServerFeature } from "@payloadcms/richtext-lexical"

export const CollapsibleFeature = createServerFeature({
  feature: {
    ClientFeature: "@/lexical/collapsible/collapsible-feature.client#CollapsibleFeatureClient",
  },
  key: "collapsible",
})
