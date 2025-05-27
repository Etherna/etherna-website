import { seoPlugin } from "@payloadcms/plugin-seo"

import { env } from "@/env"

export const seo = seoPlugin({
  generateTitle: ({ doc }) => {
    return doc?.title ? `${doc.title} | Etherna` : "Etherna"
  },
  generateURL: ({ doc }) => {
    return doc?.slug
      ? `${env.NEXT_PUBLIC_SERVER_URL ?? ""}/${doc.slug}`
      : (env.NEXT_PUBLIC_SERVER_URL ?? "")
  },
})
