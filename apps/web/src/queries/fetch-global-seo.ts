import { readSingleton } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"

export type ParsedGlobalSeoData = Awaited<ReturnType<typeof fetchGlobalSeo>>

export async function fetchGlobalSeo() {
  const seoResult = await directusClient.request(
    readSingleton("company_info", {
      fields: ["company_payoff"],
    })
  )

  const seo = {
    companyPayoff: seoResult.company_payoff,
  }

  return {
    seo,
  }
}
