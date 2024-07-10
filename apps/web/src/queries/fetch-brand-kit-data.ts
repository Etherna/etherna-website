import { readSingleton } from "@directus/sdk"

import { directusClient } from "@/classes/directus-client"
import { parseFluidImage } from "@/utils/data-parser"

export type ParsedBrandKitData = Awaited<ReturnType<typeof fetchBrandKitData>>

export async function fetchBrandKitData() {
  const brandResult = await directusClient.request(
    readSingleton("brand", {
      fields: [
        "colors",
        "fonts",
        {
          logos: [
            "name",
            {
              logo_variants: [
                "id",
                "variant_name",
                "style",
                {
                  image: ["id", "width", "height", "title", "type"],
                },
              ],
            },
          ],
        },
      ],
    })
  )

  const brand = {
    colors: brandResult.colors,
    fonts: brandResult.fonts.map(font => ({
      name: font.name,
      fontFamily: font.font_family,
      fontWeight: font.font_weight,
      importUrl: font.import_url,
      fontLink: font.font_link,
    })),
    logos: await Promise.all(
      (brandResult.logos ?? []).map(async logo => ({
        name: logo.name,
        variants: await Promise.all(
          (logo.logo_variants ?? []).map(async variant => ({
            id: variant.id,
            variantName: variant.variant_name,
            style: variant.style,
            image: await parseFluidImage(variant.image),
          }))
        ),
      }))
    ),
  }

  return {
    brand,
  }
}
