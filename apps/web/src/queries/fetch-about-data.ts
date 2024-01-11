import DirectusClient from "@/classes/directus-client"
import { parseTeam } from "@/utils/dataParser"

import type { TeamMemberNode } from "@/schema/cms"
import type { Lang } from "@/utils/lang"

export default async function fetchAboutData(lang: Lang) {
  const client = new DirectusClient()
  const { data: teamMembers } = await client.getItems<TeamMemberNode>("team", {
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
  })

  const team = await parseTeam(teamMembers, lang)

  if (!team.length) {
    throw new Error("Team not found")
  }

  return {
    team,
  }
}
