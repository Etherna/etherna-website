import { getImage } from "@astrojs/image"

import DirectusClient from "@/classes/DirectusClient"
import { parseMilestones } from "@/utils/dataParser"

import type { MilestoneNode } from "@/schema/cms"
import type { Lang } from "@/utils/lang"

export default async function fetchHomeData(lang: Lang) {
  const client = new DirectusClient()
  const { data: milestones } = await client.getItems<MilestoneNode>("milestones", {
    fields: [
      "image.private_hash",
      "image.filename_disk",
      "image.width",
      "image.height",
      "image.description",
      "completion",
      "completion_quarter",
      "latitude",
      "longitude",
      "sort",
      "localized_contents.title",
      "localized_contents.subtitle",
      "localized_contents.description",
      "localized_contents.locale",
    ],
    sort: [{ key: "sort" }],
  })

  const awards = [
    {
      title: "SwarmGrants",
      description: "SwarmGrantsDesc",
      image: await getImage({
        src: import("@/assets/logos/swarm-grants.svg"),
        aspectRatio: 1,
        format: "svg",
        alt: "Swarm Grants",
      }),
      link: "https://medium.com/ethereum-swarm/buzz-is-in-the-air-swarm-grants-results-are-in-a030ab9178a9",
    },
    {
      title: "DevconArchive",
      description: "DevconArchiveDesc",
      image: await getImage({
        src: import("@/assets/logos/devcon-archive.svg"),
        aspectRatio: 1,
        format: "svg",
        alt: "Devcon Archive",
      }),
      link: "https://medium.com/ethereum-swarm/through-etherna-the-devcon-video-archive-is-now-available-on-the-swarm-network-66d4583df8c0",
    },
  ]

  return {
    milestones: await parseMilestones(milestones, lang),
    awards,
  }
}
