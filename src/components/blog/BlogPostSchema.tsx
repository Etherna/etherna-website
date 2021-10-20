import React from "react"
import removeMd from "remove-markdown"

import { AuthorNode } from "@definitions/sources"
import dayjs from "@utils/dayjs"

type BlogPostSchemaProps = {
  author: AuthorNode
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

const BlogPostSchema: React.FC<BlogPostSchemaProps> = ({
  author,
  title,
  image,
  url,
  excerpt,
  content,
  keywords,
  lang,
  publishDate,
  updateDate
}) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "publisher": {
      "@type": "Organization",
      "name": "Etherna Sagl",
      "email": "info(at)etherna.io",
      "logo": {
        "@type": "ImageObject",
        "url": process.env.SITE_URL + require("@images/logo-etherna.png"),
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": process.env.SITE_URL + url
    },
  }

  if (author) {
    schema["author"] = `${author.first_name} ${author.last_name}`.trim()
  }

  if (image) {
    schema["image"] = image
  }

  if (excerpt) {
    schema["description"] = excerpt
  }

  if (content) {
    const wordCount = removeMd(content).split(/\W+/).length
    schema["wordCount"] = wordCount
  }

  if (keywords) {
    schema["keywords"] = keywords.split(/[ ,;]/).join(" ")
  }

  if (lang) {
    schema["inLanguage"] = lang
  }

  if (publishDate) {
    const date = dayjs(publishDate).format("YYYY-MM-DD")
    schema["dateCreated"] = date
    schema["datePublished"] = date
  }

  if (updateDate) {
    schema["dateModified"] = dayjs(updateDate).format("YYYY-MM-DD")
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default BlogPostSchema
