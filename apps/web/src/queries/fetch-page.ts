import { bundleBlocks, bundleMedia } from "@/utils/bundle"
import { fetchPayloadRequest } from "@/utils/payload"

import type { Locale } from "@/lang/types"
import type { Page } from "@payload-types"

interface FetchPageParams {
  id: string
  locale: Locale
  accessToken?: string
}

export async function fetchPage(params: FetchPageParams) {
  const { id, locale, accessToken } = params

  const page = await fetchPayloadRequest<Page>({
    method: "GET",
    path: `/pages/${id}`,
    params: { locale, depth: 1 },
    accessToken,
  })

  return {
    ...page,
    layout: await bundleBlocks(page.layout, locale, accessToken),
    meta: {
      ...page.meta,
      image: await bundleMedia(page.meta?.image, locale, accessToken),
    },
  } satisfies Page
}
