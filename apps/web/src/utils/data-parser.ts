import { getImage } from "@astrojs/image"

import { getDirectusAssetUrl } from "./assets"
import { serverImageToBlurhash } from "./blurhash"

import type { Lang } from "./lang"
import type { AstroImg } from "@/schema/app"
import type { DirectusFile } from "@directus/sdk"

export const findTranslation = <T extends { locale: Locale }>(
  items: T[],
  lang: Lang,
  fallbackLang?: Lang
): T => {
  const item =
    items.find(i => i.locale.startsWith(lang)) ??
    (fallbackLang ? items.find(i => i.locale.startsWith(fallbackLang)) : null)
  if (!item) throw new Error(`No translation found for ${lang}`)
  return item
}

/**
 * Parse image node to fluid image
 */
export const parseFluidImage = async (
  image: Pick<DirectusFile<DirectusSchema>, "id" | "title" | "type" | "width" | "height"> | null,
  alt?: string
): Promise<AstroImg | null> => {
  if (!image) return null

  const formats = {
    "image/jpeg": "jpeg",
    "image/jpg": "jpeg",
    "image/png": "png",
    "image/svg+xml": "svg",
  } as const
  const mimeType = image.type as keyof typeof formats
  const format = mimeType in formats ? formats[mimeType] : "jpeg"

  const width = image.width ?? 100
  const height = image.height ?? 100

  const src = getDirectusAssetUrl(image.id)
  const attributes = await getImage({
    src,
    alt: alt ?? image.title ?? "",
    width,
    height,
    format,
  })
  const blurhash = await serverImageToBlurhash({
    src,
    width,
    height,
    format,
  })

  return {
    attributes,
    blurhash,
  }
}

export const loadSvgAsset = async (fileId: UUID | null) => {
  let svg: string | null = null

  try {
    if (!fileId) throw new Error("No file ID")

    const url = getDirectusAssetUrl(fileId)
    const resp = await fetch(url)

    if (!resp.ok) throw new Error(`Failed to fetch ${url}`)

    svg = (await resp.text()) as string
  } catch (error) {
    //
  }

  return {
    svg,
  }
}

export const localeToLang = (locale: Locale): Lang => {
  const lang = locale.split("-")[0] as Lang
  return lang
}
