import { bundleMedia, resolveInternalLink } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"

import type { Locale } from "@/lang/types"
import type { Header } from "@payload-types"

interface FetchHeaderParams {
  locale: Locale
  accessToken?: string
}

export async function fetchHeader(params: FetchHeaderParams) {
  const { locale, accessToken } = params

  const header = await fetchPayloadRequest<Header>({
    method: "GET",
    path: `/globals/header`,
    params: { locale, depth: 1 },
    accessToken,
  })

  return {
    ...header,
    navItems: await Promise.all(
      (header.navItems ?? []).map(async (navItem) => ({
        ...navItem,
        link: {
          ...(await resolveInternalLink(navItem.link, locale, accessToken)),
          icon: await bundleMedia(navItem.link.icon, locale, accessToken),
          sublinks: await Promise.all(
            (navItem.link.sublinks ?? []).map(async (sublink) => ({
              ...sublink,
              link: {
                ...(await resolveInternalLink(sublink.link, locale, accessToken)),
                icon: await bundleMedia(sublink.link.icon, locale, accessToken),
              },
            })),
          ),
        },
      })),
    ),
  } satisfies Header
}
