import DirectusClient from "@/classes/DirectusClient"
import { parseTeam } from "@/utils/dataParser"

import type { TeamMemberNode } from "@/definitions/sources"
import type { Lang } from "@/utils/lang"

export default async function fetchAboutData(lang: Lang) {
  const client = new DirectusClient()
  const teamMembers = await client.getItems<TeamMemberNode>("team", {
    fields: [
      "name",
      "status",
      "photo.private_hash",
      "photo.filename_disk",
      "photo.width",
      "photo.height",
      "photo.description",
      "localized_contents.role",
      "localized_contents.bio",
      "localized_contents.locale",
    ],
    sort: [{ key: "sort", order: "asc" }],
  })

  const team = await parseTeam(teamMembers, lang)

  if (!team.length) {
    throw new Error("Team not found")
  }

  return {
    team,
  }
}
