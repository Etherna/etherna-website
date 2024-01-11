import { PAGINATION_LIMIT } from "./fetch-paths"
import DirectusClient from "@/classes/directus-client"
import { parseCategory, parsePost } from "@/utils/dataParser"
import { Languages } from "@/utils/lang"
import routes, { parsePage, parseSlug, whichRoute } from "@/utils/routes"

import type { CategoryNode, PostNode } from "@/schema/cms"
import type { Lang, LocalizedPaths } from "@/utils/lang"

export default async function fetchBlogData(lang: Lang, path: string) {
  const routeIdentifier = whichRoute(path, lang)
  const page = parsePage(path) ?? 1
  const categorySlug = routeIdentifier === "category" ? parseSlug(path) : null

  const client = new DirectusClient()
  const [{ data: posts, meta }, { data: categories }] = await Promise.all([
    client.getItems<PostNode>("posts", {
      fields: [
        "updated_on",
        "published_on",
        "image.private_hash",
        "image.filename_disk",
        "image.width",
        "image.height",
        "image.description",
        "author.first_name",
        "author.last_name",
        "author.email",
        "author.avatar.private_hash",
        "author.avatar.filename_disk",
        "author.avatar.width",
        "author.avatar.height",
        "author.avatar.description",
        "category.id",
        "localized_contents.title",
        "localized_contents.slug",
        "localized_contents.excerpt",
        "localized_contents.locale",
      ],
      filter: {
        ...{
          "localized_contents.locale": {
            eq: lang,
          },
        },
        ...(categorySlug
          ? {
              "category.localized_contents.slug": {
                eq: categorySlug,
              },
            }
          : {}),
      },
      sort: [
        { key: "published_on", order: "desc" },
        { key: "modified_on", order: "desc" },
      ],
      limit: PAGINATION_LIMIT,
      offset: (page - 1) * PAGINATION_LIMIT,
      meta: ["filter_count"],
    }),
    client.getItems<CategoryNode>("categories", {
      fields: [
        "id",
        "color",
        "posts",
        "localized_contents.name",
        "localized_contents.slug",
        "localized_contents.locale",
      ],
    }),
  ])

  const pagesCount = Math.ceil(meta.filter_count / PAGINATION_LIMIT)
  const parsedCategories = await Promise.all(
    categories.filter(c => c.posts!.length > 0).map(category => parseCategory(category, lang))
  )
  const currentCategory = parsedCategories.find(c => c.slug === categorySlug)
  const parsedPosts = (await Promise.all(posts.map(post => parsePost(post, lang)))).map(post => ({
    ...post,
    category: parsedCategories.find(c => c.id === post.category?.id),
  }))

  const localizedPaths: LocalizedPaths = Languages.reduce(
    (acc, lang) => ({
      ...acc,
      [lang]: categorySlug
        ? routes.blogCategoryPath(
            categories
              .find(c => c.localized_contents.some(lc => lc.slug === categorySlug))
              ?.localized_contents.find(lc => lc.locale === lang)?.slug ?? categorySlug,
            lang
          )
        : routes.blogPath(lang),
    }),
    {}
  )

  return {
    posts: parsedPosts,
    categories: parsedCategories,
    currentCategory,
    page,
    pagesCount,
    localizedPaths,
  }
}
