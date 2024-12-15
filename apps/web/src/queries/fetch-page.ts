import { LOCALES } from "@/i18n/consts"
import { localized } from "@/i18n/utils"
import { bundleBlocks, bundleHero, bundleMedia } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"
import { route } from "@/lib/routes"

import type { Locale, LocalizedPath } from "@/i18n/types"
import type { Page } from "@payload-types"

interface FetchPageParams {
  id: string
  locale: Locale
  accessToken?: string
}

export async function fetchPage(params: FetchPageParams) {
  const { id, locale, accessToken } = params

  const otherLocales = LOCALES.filter((l) => l !== locale)

  const [pageData, otherLocalesData] = await Promise.all([
    fetchPayloadRequest<Page>({
      method: "GET",
      path: `/pages/${id}`,
      params: { locale, depth: 1, limit: 0 },
      accessToken,
    }),
    Promise.all(
      otherLocales.map(async (otherLocale) => ({
        locale: otherLocale,
        ...(await fetchPayloadRequest<Page>({
          method: "GET",
          path: `/pages/${id}`,
          params: {
            locale: otherLocale,
            depth: 1,
            limit: 0,
            select: {
              breadcrumbs: true,
              slug: true,
            },
          },
          accessToken,
        })),
      })),
    ),
  ])

  const page = {
    ...pageData,
    hero: await bundleHero(pageData.hero, locale, accessToken),
    layout: await bundleBlocks(pageData.layout ?? [], locale, accessToken),
    meta: {
      ...pageData.meta,
      image: await bundleMedia(pageData.meta?.image, locale, accessToken),
    },
  } satisfies Page

  const localizedPaths = otherLocalesData.map((localeData) => ({
    locale: localeData.locale,
    path: route("/:path", {
      path: ["home", "homepage"].includes(localeData.slug ?? "")
        ? ""
        : (localeData.breadcrumbs?.at(-1)?.url ?? localeData.slug ?? "").replace(/^\//, ""),
    }),
  })) satisfies LocalizedPath[]

  return { page, localizedPaths }
}
