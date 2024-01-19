import { readItems } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { findTranslation, localeToLang, parseFluidImage } from "@/utils/data-parser"
import { parseSlug, routes } from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"

export type ParsedPostData = Awaited<ReturnType<typeof fetchPostData>>
export type ParsedPost = ParsedPostData["post"]
export type ParsedPostCategory = NonNullable<ParsedPost["primaryCategory"]>
export type ParsedPostAuthor = ParsedPost["author"]

export async function fetchPostData(lang: Lang, path: string) {
  const slug = parseSlug(path)

  if (!slug) {
    throw new Error(`Slug not found, path: '${path}'`)
  }

  const postTranslationResult = await directusClient
    .request(
      readItems("blog_articles_translations", {
        fields: [
          "title",
          "slug",
          "content",
          "excerpt",
          "seo",
          "locale",
          {
            thumbnail: ["id", "width", "height", "type", "title"],
          },
          {
            article_id: [
              "published_at",
              "edited_at",
              {
                author_id: [
                  "id",
                  "email",
                  "first_name",
                  "last_name",
                  {
                    avatar: ["id", "width", "height", "type", "title"],
                  },
                ],
              },
              {
                primary_category_id: [
                  "id",
                  "color",
                  {
                    translations: ["name", "slug", "locale"],
                  },
                ],
              },
              {
                translations: ["slug", "locale"],
              },
            ],
          },
        ],
        filter: {
          _and: [
            {
              slug: {
                _eq: slug,
              },
            },
            {
              locale: {
                _starts_with: lang as Locale,
              },
            },
          ],
        },
        limit: 1,
      })
    )
    .then(res => res[0])

  if (!postTranslationResult) {
    throw new Error("Post not found")
  }

  const article = postTranslationResult.article_id as ExtractGeneric<
    typeof postTranslationResult.article_id
  >
  const primaryCategory = article.primary_category_id as ExtractGeneric<
    typeof article.primary_category_id
  >
  const primaryCategoryTranslation = primaryCategory
    ? findTranslation(primaryCategory.translations, lang)
    : null

  const post = {
    title: postTranslationResult.title,
    slug: postTranslationResult.slug,
    excerpt: postTranslationResult.excerpt,
    content: postTranslationResult.content,
    seo: postTranslationResult.seo,
    thumbnail: await parseFluidImage(postTranslationResult.thumbnail),
    locale: postTranslationResult.locale,
    publishedAt: article.published_at as string,
    editedAt: article.edited_at,
    primaryCategory:
      primaryCategory && primaryCategoryTranslation
        ? {
            id: primaryCategory.id,
            color: primaryCategory.color,
            name: primaryCategoryTranslation.name,
            slug: primaryCategoryTranslation.slug,
            description: primaryCategoryTranslation.description,
          }
        : null,
    author: {
      id: article.author_id.id,
      email: article.author_id.email,
      firstName: article.author_id.first_name,
      lastName: article.author_id.last_name,
      avatar: article.author_id.avatar
        ? await parseFluidImage(
            article.author_id.avatar as ExtractGeneric<typeof article.author_id.avatar>
          )
        : null,
    },
    allLanguages: article.translations.map(t => ({
      slug: t.slug,
      lang: localeToLang(t.locale),
    })),
  }

  const localizedPaths: LocalizedPaths = article.translations
    .filter(p => localeToLang(p.locale) !== lang)
    .reduce(
      (acc, project) => ({
        ...acc,
        [localeToLang(project.locale)]: routes.projectPath(
          project.slug,
          localeToLang(project.locale)
        ),
      }),
      {}
    )

  return {
    post,
    localizedPaths,
  }
}
