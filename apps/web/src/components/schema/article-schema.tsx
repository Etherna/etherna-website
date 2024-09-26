import { JsonLd } from "react-schemaorg"

import ethernaLogo from "@/assets/logo-etherna.png"

import { dayjs } from "@/lib/dayjs"

import type { ParsedPostAuthor } from "@/queries/fetch-post-data"
import type { Article } from "schema-dts"

export interface ArticleSchemaProps {
  author: ParsedPostAuthor
  title?: string | null
  image?: string | null
  url: string
  excerpt?: string | null
  wordCount?: number | null
  keywords?: string | null
  lang?: string | null
  publishDate?: string | null
  updateDate?: string | null
}

export function ArticleSchema({
  author,
  title,
  wordCount,
  excerpt,
  image,
  keywords,
  lang,
  publishDate,
  updateDate,
  url,
}: ArticleSchemaProps) {
  return (
    <JsonLd<Article>
      item={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title ?? undefined,
        inLanguage: lang ?? undefined,
        author: `${author.firstName} ${author.lastName}`.trim(),
        image: image ?? undefined,
        description: excerpt ?? undefined,
        dateCreated: publishDate ? dayjs(publishDate).format("YYYY-MM-DD") : undefined,
        datePublished: publishDate ? dayjs(publishDate).format("YYYY-MM-DD") : undefined,
        dateModified: updateDate ? dayjs(updateDate).format("YYYY-MM-DD") : undefined,
        wordCount: wordCount ?? undefined,
        keywords: keywords?.split(/[ ,;]/).join(" "),
        publisher: {
          "@type": "Organization",
          name: "Etherna SA",
          email: "info(at)etherna.io",
          logo: {
            "@type": "ImageObject",
            url: import.meta.env.PUBLIC_SITE_URL + ethernaLogo.src,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": import.meta.env.PUBLIC_SITE_URL + url,
        },
      }}
    />
  )
}
