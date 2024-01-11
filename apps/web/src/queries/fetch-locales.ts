import DirectusClient from "@/classes/directus-client"
import { parseFluidImage } from "@/utils/dataParser"

import type { LocaleNode } from "@/schema/cms"
import type { LocaleInfo } from "@/utils/lang"

export default async function fetchLocales() {
  const client = new DirectusClient()
  const { data: locales } = await client.getItems<LocaleNode>("locales", {
    fields: [
      "code",
      "name",
      "flag.private_hash",
      "flag.filename_disk",
      "flag.width",
      "flag.height",
      "flag.description",
    ],
  })

  const navbarLocales = await Promise.all(
    locales.map(
      async l =>
        ({
          code: l.code,
          name: l.name,
          flag: (await parseFluidImage(l.flag, l.name))!,
        }) as LocaleInfo
    )
  )

  return {
    locales: navbarLocales,
  }
}
