import DirectusClient from "@/classes/DirectusClient"
import { parseMilestones } from "@/utils/dataParser"

import type { MilestoneNode } from "@/definitions/sources"
import type { Lang } from "@/utils/lang"

export default async function fetchHomeData(lang: Lang) {
  const client = new DirectusClient()
  const milestones = await client.getItems<MilestoneNode>("milestones", {
    fields: [
      "image.private_hash",
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
    ],
    sort: [{ key: "sort" }],
  })

  return {
    milestones: await parseMilestones(milestones, lang),
  }
}
