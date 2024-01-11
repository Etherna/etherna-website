import DirectusClient from "@/classes/directus-client"
import { parseBrand } from "@/utils/dataParser"

import type { BrandNode } from "@/schema/cms"

export default async function fetchBrandKitData() {
  const client = new DirectusClient()
  const {
    data: [brand],
  } = await client.getItems<BrandNode>("brand", {
    fields: [
      "colors.color",
      "colors.name",
      "fonts.name",
      "fonts.font_family",
      "fonts.font_weight",
      "fonts.import_url",
      "fonts.font_link",
      "logos.name",
      "logos.logo_variants.style",
      "logos.logo_variants.variant_name",
      "logos.logo_variants.image.private_hash",
      "logos.logo_variants.image.filename_disk",
      "logos.logo_variants.image.width",
      "logos.logo_variants.image.height",
      "logos.logo_variants.image.description",
    ],
  })

  if (!brand) {
    throw new Error("Brand not found")
  }

  const parsedBrand = await parseBrand(brand)

  return parsedBrand
}
