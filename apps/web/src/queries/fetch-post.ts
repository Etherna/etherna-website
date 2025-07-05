import { LOCALES } from "@/i18n/consts"
import { bundleLexical, bundleMedia } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"
import { route } from "@/lib/routes"

import type { Locale, LocalizedPath } from "@/i18n/types"
import type { NodeType } from "@/lib/lexical"
import type { Post } from "@payload-types"

interface FetchPostParams {
  id: string
  locale: Locale
  accessToken?: string
}

export async function fetchPost(params: FetchPostParams) {
  const { id, locale, accessToken } = params

  const otherLocales = LOCALES.filter((l) => l !== locale)

  const [postData, otherLocalesData] = await Promise.all([
    fetchPayloadRequest<Post & { locale: Locale }>({
      method: "GET",
      path: `/posts/${id}`,
      params: { locale, depth: 1 },
      accessToken,
    }),
    Promise.all(
      otherLocales.map(async (otherLocale) => ({
        locale: otherLocale,
        ...(await fetchPayloadRequest<Post>({
          method: "GET",
          path: `/posts/${id}`,
          params: {
            locale: otherLocale,
            depth: 1,
            limit: 0,
            select: {
              slug: true,
            },
          },
          accessToken,
        })),
      })),
    ),
  ])

  const post = {
    ...postData,
    thumbnail: await bundleMedia(postData.thumbnail, locale, accessToken),
    populatedAuthors: await Promise.all(
      (postData.populatedAuthors ?? [])
        .filter((a) => typeof a === "object")
        .map(async (author) => ({
          ...author,
          avatar: await bundleMedia(author.avatar, locale, accessToken),
        })),
    ),
    content: {
      ...postData.content,
      root: {
        ...postData.content.root,
        children: await bundleLexical(
          postData.content.root.children as NodeType[],
          locale,
          accessToken,
        ),
      },
    },
    meta: {
      ...postData.meta,
      image: await bundleMedia(postData.meta?.image, locale, accessToken),
    },
  } satisfies Post

  const localizedPaths = otherLocalesData.map((localeData) => ({
    locale: localeData.locale,
    path: route("/blog/:slug", {
      slug: (localeData.slug ?? "").replace(/^\//, ""),
    }),
  })) satisfies LocalizedPath[]

  return { post, localizedPaths }
}
