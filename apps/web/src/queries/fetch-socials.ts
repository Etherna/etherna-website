import { readSingleton } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"

export type ParsedSocialsData = Awaited<ReturnType<typeof fetchSocials>>

export async function fetchSocials() {
  const socialsResult = await directusClient.request(
    readSingleton("company_info", {
      fields: [
        "github_url",
        "discord_url",
        "twitter_url",
        "telegram_url",
        "linkedin_url",
        "facebook_url",
        "instagram_url",
      ],
    })
  )

  const socials = {
    facebook: socialsResult.facebook_url,
    instagram: socialsResult.instagram_url,
    twitter: socialsResult.twitter_url,
    linkedin: socialsResult.linkedin_url,
    discord: socialsResult.discord_url,
    telegram: socialsResult.telegram_url,
    github: socialsResult.github_url,
  }

  return {
    socials,
  }
}
