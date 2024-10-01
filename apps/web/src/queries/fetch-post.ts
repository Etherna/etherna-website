import { bundleLexical, bundleMedia } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"

import type { Locale, LocalizedPath } from "@/lang/types"
import type { NodeType } from "@/lib/lexical"
import type { Post } from "@payload-types"

interface FetchPostParams {
  id: string
  locale: Locale
  accessToken?: string
}

export async function fetchPost(params: FetchPostParams) {
  const { id, locale, accessToken } = params

  const postData = await fetchPayloadRequest<Post>({
    method: "GET",
    path: `/posts/${id}`,
    params: { locale, depth: 1 },
    accessToken,
  })

  const post = {
    ...postData,
    thumbnail: await bundleMedia(postData.thumbnail, locale, accessToken),
    populatedAuthors: await Promise.all(
      (postData.populatedAuthors ?? []).map(async (author) => ({
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

  const localizedPaths = [] satisfies LocalizedPath[]

  return { post, localizedPaths }
}
