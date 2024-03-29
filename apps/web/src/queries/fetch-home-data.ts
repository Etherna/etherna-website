import { readItems, readSingleton } from "@directus/sdk"

import { DevconArchiveLogo, SwarmGrantsLogo } from "@/components/assets/brands"

import { directusClient } from "@/classes/directus-client"
import { findTranslation, parseFluidImage } from "@/utils/data-parser"

import type { Lang } from "@/utils/lang"

export type ParsedHomeData = Awaited<ReturnType<typeof fetchHomeData>>
export type ParsedAward = ParsedHomeData["awards"][number]
export type ParsedMilestone = ParsedHomeData["milestones"][number]

export async function fetchHomeData(lang: Lang) {
  const [milestonesResult, companyInfoResult] = await Promise.all([
    directusClient.request(
      readItems("milestones", {
        fields: [
          "completion",
          "completion_quarter",
          "latitude",
          "longitude",
          {
            image: ["id", "width", "height", "title"],
          },
          {
            translations: ["title", "subtitle", "description", "locale"],
          },
        ],
        sort: ["sort"],
      })
    ),
    directusClient.request(readSingleton("company_info")),
  ])

  const milestones = await Promise.all(
    milestonesResult.map(async res => {
      const translation = findTranslation(res.translations ?? [], lang)
      return {
        completion: res.completion,
        completionQuarter: res.completion_quarter,
        latitude: res.latitude,
        longitude: res.longitude,
        image: await parseFluidImage(res.image),
        title: translation.title,
        subtitle: translation.subtitle,
        description: translation.description,
      }
    })
  )

  const awards = [
    {
      title: "SwarmGrants",
      description: "SwarmGrantsDesc",
      image: SwarmGrantsLogo,
      link: "https://medium.com/ethereum-swarm/buzz-is-in-the-air-swarm-grants-results-are-in-a030ab9178a9",
    },
    {
      title: "DevconArchive",
      description: "DevconArchiveDesc",
      image: DevconArchiveLogo,
      link: "https://medium.com/ethereum-swarm/through-etherna-the-devcon-video-archive-is-now-available-on-the-swarm-network-66d4583df8c0",
    },
  ]

  const companyInfo = {
    companyName: companyInfoResult.company_name,
    companyAddressLocality: companyInfoResult.company_address_locality,
    companyAddressPostalCode: companyInfoResult.company_address_postal_code,
    companyAddressStreet: companyInfoResult.company_address_street,
    companyAddressCountry: companyInfoResult.company_address_country,
    companyEmail: companyInfoResult.company_email,
    companyKeywords: companyInfoResult.company_keywords,
    companyFoundingDate: companyInfoResult.company_founding_date,
    socials: {
      facebook: companyInfoResult.facebook_url,
      twitter: companyInfoResult.twitter_url,
      telegram: companyInfoResult.telegram_url,
      linkedin: companyInfoResult.linkedin_url,
      discord: companyInfoResult.discord_url,
      github: companyInfoResult.github_url,
      instagram: companyInfoResult.instagram_url,
    },
  }

  return {
    milestones,
    awards,
    companyInfo,
  }
}
