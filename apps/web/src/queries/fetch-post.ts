import { bundleLexical, bundleMedia } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"

import type { Locale } from "@/lang/types"
import type { NodeType } from "@/lib/lexical"
import type { Post } from "@payload-types"

interface FetchPostParams {
  id: string
  locale: Locale
  accessToken?: string
}

export async function fetchPost(params: FetchPostParams) {
  const { id, locale, accessToken } = params

  const post = await fetchPayloadRequest<Post>({
    method: "GET",
    path: `/posts/${id}`,
    params: { locale, depth: 1 },
    accessToken,
  })

  return {
    ...post,
    thumbnail: await bundleMedia(post.thumbnail, locale, accessToken),
    populatedAuthors: await Promise.all(
      (post.populatedAuthors ?? []).map(async (author) => ({
        ...author,
        avatar: await bundleMedia(author.avatar, locale, accessToken),
      })),
    ),
    content: {
      ...post.content,
      root: {
        ...post.content.root,
        children: await bundleLexical(
          post.content.root.children as NodeType[],
          locale,
          accessToken,
        ),
      },
    },
    meta: {
      ...post.meta,
      image: await bundleMedia(post.meta?.image, locale, accessToken),
    },
  } satisfies Post
}
