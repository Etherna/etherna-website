import DirectusClient from "@/classes/DirectusClient"
import { parsePost } from "@/utils/dataParser"
import routes, { parseSlug } from "@/utils/routes"

import type { PostNode } from "@/schema/cms"
import type { Lang, LocalizedPaths } from "@/utils/lang"

export default async function fetchPostData(lang: Lang, path: string) {
  const slug = parseSlug(path)

  if (!slug) {
    throw new Error(`Slug not found, path: '${path}'`)
  }

  const client = new DirectusClient()
  const {
    data: [post],
  } = await client.getItems<PostNode>("posts", {
    fields: [
      "id",
      "status",
      "updated_on",
      "published_on",
      "author.id",
      "author.email",
      "author.first_name",
      "author.last_name",
      "author.avatar.private_hash",
      "author.avatar.filename_disk",
      "author.avatar.width",
      "author.avatar.height",
      "image.private_hash",
      "image.filename_disk",
      "image.width",
      "image.height",
      "image.description",
      "localized_contents.title",
      "localized_contents.slug",
      "localized_contents.content",
      "localized_contents.excerpt",
      "localized_contents.meta_description",
      "localized_contents.meta_keywords",
      "localized_contents.locale",
      "category.id",
      "category.color",
      "category.localized_contents.name",
      "category.localized_contents.slug",
      "category.localized_contents.locale",
    ],
    filter: {
      "localized_contents.slug": {
        eq: slug,
      },
    },
  })

  if (!post) {
    throw new Error("Team not found")
  }

  const postLangs = post.localized_contents.map(lc => lc.locale)
  const parsedPosts = await Promise.all(postLangs.map(lang => parsePost(post, lang)))
  const parsedPost = parsedPosts.find(project => project.locale === lang)!

  const localizedPaths: LocalizedPaths = parsedPosts
    .filter(p => p.locale !== lang)
    .reduce(
      (acc, project) => ({
        ...acc,
        [project.locale]: routes.projectPath(project.slug, project.locale as Lang),
      }),
      {}
    )

  return {
    post: parsedPost,
    localizedPaths,
  }
}
