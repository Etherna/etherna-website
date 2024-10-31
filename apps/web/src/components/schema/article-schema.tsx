import { JsonLd } from "react-schemaorg"
import { formatDate } from "date-fns"

import ethernaLogo from "@/assets/logo-etherna.png"

import type { User } from "@payload-types"
import type { Article } from "schema-dts"

export interface ArticleSchemaProps {
  authors: User[]
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
  authors,
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
        author: authors.map((author) => ({
          "@type": "Person",
          name: author.name,
        })),
        image: image ?? undefined,
        description: excerpt ?? undefined,
        dateCreated: publishDate ? formatDate(publishDate, "yyyy-MM-dd") : undefined,
        datePublished: publishDate ? formatDate(publishDate, "yyyy-MM-dd") : undefined,
        dateModified: updateDate ? formatDate(updateDate, "yyyy-MM-dd") : undefined,
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
