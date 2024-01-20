import { readItems } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { findTranslation, parseFluidImage } from "@/utils/data-parser"

import type { Lang } from "@/utils/lang"

export type ParsedTeamData = Awaited<ReturnType<typeof fetchTeamData>>
export type ParsedTeamMember = ParsedTeamData["team"][number]

export async function fetchTeamData(lang: Lang) {
  const result = await directusClient.request(
    readItems("team_members", {
      fields: [
        "name",
        { photo: ["id", "width", "height", "title", "type"] },
        { translations: ["role", "bio", "locale"] },
      ],
      filter: {
        translations: {
          locale: {
            _starts_with: lang as Locale,
          },
        },
      },
      sort: ["sort"],
    })
  )

  const team = await Promise.all(
    result.map(async res => {
      const translation = findTranslation(res.translations ?? [], lang)
      return {
        name: res.name,
        photo: await parseFluidImage(res.photo),
        role: translation.role,
        bio: translation.bio,
        locale: translation.locale,
      }
    })
  )

  return {
    team,
  }
}
