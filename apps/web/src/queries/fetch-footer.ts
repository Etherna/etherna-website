import { resolveInternalLink } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"

import type { Locale } from "@/lang/types"
import type { Footer } from "@payload-types"

interface FetchFooterParams {
  locale: Locale
  accessToken?: string
}

export async function fetchFooter(params: FetchFooterParams) {
  const { locale, accessToken } = params

  const footer = await fetchPayloadRequest<Footer>({
    method: "GET",
    path: `/globals/footer`,
    params: { locale, depth: 1 },
    accessToken,
  })

  return {
    ...footer,
    groups: await Promise.all(
      (footer.groups ?? []).map(async (group) => ({
        ...group,
        groupItems: await Promise.all(
          (group.groupItems ?? []).map(async (item) => ({
            ...item,
            link: {
              ...(await resolveInternalLink(item.link, locale, accessToken)),
            },
          })),
        ),
      })),
    ),
  } satisfies Footer
}
