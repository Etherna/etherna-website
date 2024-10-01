import { resolveInternalLink } from "@/lib/bundle"
import { fetchPayloadRequest } from "@/lib/payload"

import type { Locale } from "@/lang/types"
import type { Company, Footer } from "@payload-types"

interface FetchFooterParams {
  locale: Locale
  accessToken?: string
}

export async function fetchFooter(params: FetchFooterParams) {
  const { locale, accessToken } = params

  const [footerData, companyData] = await Promise.all([
    fetchPayloadRequest<Footer>({
      method: "GET",
      path: `/globals/footer`,
      params: { locale },
      accessToken,
    }),
    fetchPayloadRequest<Company>({
      method: "GET",
      path: `/globals/company`,
      params: { locale },
      accessToken,
    }),
  ])

  const footer = {
    ...footerData,
    groups: await Promise.all(
      (footerData.groups ?? []).map(async (group) => ({
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
    legalLinks: await Promise.all(
      (footerData.legalLinks ?? []).map(async (link) => ({
        ...link,
        link: {
          ...(await resolveInternalLink(link.link, locale, accessToken)),
        },
      })),
    ),
  } satisfies Footer

  return {
    footer,
    company: companyData,
  }
}
