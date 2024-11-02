import { fetchPayloadRequest } from "@/lib/payload"

import type { Locale } from "@/i18n/types"
import type { Company } from "@payload-types"

interface FetchPageParams {
  locale: Locale
  accessToken?: string
}

export async function fetchCompany(params: FetchPageParams) {
  const { locale, accessToken } = params

  const company = await fetchPayloadRequest<Company>({
    method: "GET",
    path: `/globals/company`,
    params: { locale },
    accessToken,
  })

  return { company }
}
