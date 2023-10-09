import { JsonLd } from "react-schemaorg"
import dayjs from "dayjs"
import removeMd from "remove-markdown"

import ethernaLogo from "@/assets/logo-etherna.png"

import type { User } from "@/schema/app"
import type { Article } from "schema-dts"

export type ArticleSchemaProps = {
  author: User
  title?: string | null
  image?: string | null
  url?: string | null
  excerpt?: string | null
  content?: string | null
  keywords?: string | null
  lang?: string | null
  publishDate?: string | null
  updateDate?: string | null
}

const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  author,
  title,
  content,
  excerpt,
  image,
  keywords,
  lang,
  publishDate,
  updateDate,
  url,
}) => {
  return (
    <JsonLd<Article>
      item={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title ?? undefined,
        inLanguage: lang ?? undefined,
        author: author ? `${author.first_name} ${author.last_name}`.trim() : undefined,
        image: image ?? undefined,
        description: excerpt ?? undefined,
        dateCreated: publishDate ? dayjs(publishDate).format("YYYY-MM-DD") : undefined,
        datePublished: publishDate ? dayjs(publishDate).format("YYYY-MM-DD") : undefined,
        dateModified: updateDate ? dayjs(updateDate).format("YYYY-MM-DD") : undefined,
        wordCount: removeMd(content ?? "").split(/\W+/).length,
        keywords: keywords?.split(/[ ,;]/).join(" "),
        publisher: {
          "@type": "Organization",
          name: "Etherna SA",
          email: "info(at)etherna.io",
          logo: {
            "@type": "ImageObject",
            url: import.meta.env.SITE_URL + ethernaLogo.src,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": import.meta.env.SITE_URL + url,
        },
      }}
    />
  )
}

export default ArticleSchema
