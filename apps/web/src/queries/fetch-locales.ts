import { readItems } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { loadSvgAsset, localeToLang } from "@/utils/data-parser"

export async function fetchLocales() {
  const languagesResult = await directusClient.request(
    readItems("languages", {
      fields: [
        "code",
        "name",
        {
          icon: ["id"],
        },
      ],
    })
  )

  const locales = await Promise.all(
    languagesResult.map(async res => ({
      code: localeToLang(res.code),
      name: res.name,
      icon: await loadSvgAsset(res.icon?.id ?? null),
    }))
  )

  return {
    locales,
  }
}
