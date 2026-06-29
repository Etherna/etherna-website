import { createServerFeature } from "@payloadcms/richtext-lexical"

export const MarkdownPasteFeature = createServerFeature({
  feature: {
    ClientFeature:
      "@/lexical/markdown-paste/markdown-paste-feature.client#MarkdownPasteFeatureClient",
  },
  key: "markdownPaste",
})
