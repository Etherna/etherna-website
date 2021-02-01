import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import removeMd from "remove-markdown"

const BlogPostSchema = ({
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "publisher":{
      "@type": "Organization",
      "name":  "Etherna Sagl",
      "email": "info(at)etherna.io",
      "logo": {
        "@type": "ImageObject",
        "url": process.env.SITE_URL + require("../../images/logo-etherna.png"),
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
    schema["keywords"] = keywords.split(/[ ,;]/).join(' ')
  }

  if (lang) {
    schema["inLanguage"] = lang
  }

  if (publishDate) {
    const date = moment(publishDate).format('YYYY-MM-DD')
    schema["dateCreated"] = date
    schema["datePublished"] = date
  }

  if (updateDate) {
    schema["dateModified"] = moment(updateDate).format('YYYY-MM-DD')
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

BlogPostSchema.propTypes = {
  author: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
  title: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  excerpt: PropTypes.string,
  content: PropTypes.string,
  keywords: PropTypes.string,
  lang: PropTypes.string,
  publishDate: PropTypes.string,
  updateDate: PropTypes.string,
}

export default BlogPostSchema
