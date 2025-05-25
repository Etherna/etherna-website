import { seoPlugin } from "@payloadcms/plugin-seo"

export const seo = seoPlugin({
  generateTitle: ({ doc }) => {
    return doc?.title ? `${doc.title} | Etherna` : "Etherna"
  },
  generateURL: ({ doc }) => {
    return doc?.slug
      ? `${process.env.NEXT_PUBLIC_SERVER_URL ?? ""}/${doc.slug}`
      : (process.env.NEXT_PUBLIC_SERVER_URL ?? "")
  },
})
