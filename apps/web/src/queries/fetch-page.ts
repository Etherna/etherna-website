import { bundleBlocks, bundleHero, bundleMedia } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"

import type { Locale, LocalizedPath } from "@/lang/types"
import type { Page } from "@payload-types"

interface FetchPageParams {
  id: string
  locale: Locale
  accessToken?: string
}

export async function fetchPage(params: FetchPageParams) {
  const { id, locale, accessToken } = params

  const pageData = await fetchPayloadRequest<Page>({
    method: "GET",
    path: `/pages/${id}`,
    params: { locale, depth: 1 },
    accessToken,
  })

  const page = {
    ...pageData,
    hero: await bundleHero(pageData.hero, locale, accessToken),
    layout: await bundleBlocks(pageData.layout ?? [], locale, accessToken),
    meta: {
      ...pageData.meta,
      image: await bundleMedia(pageData.meta?.image, locale, accessToken),
    },
  } satisfies Page

  const localizedPaths = [] satisfies LocalizedPath[]

  return { page, localizedPaths }
}
