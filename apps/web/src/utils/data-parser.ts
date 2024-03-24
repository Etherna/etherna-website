import { readFile, readItem } from "@directus/sdk"
import { getFile } from "astro-plugin-files"
import { getImage } from "astro:assets"
import { Element } from "slate"
import { Leaf } from "slate-blocks/textual/leaf"

import { getDirectusAssetUrl } from "./assets"
import { FallbackBlurhash, serverImageToBlurhash } from "./blurhash"
import { routes } from "./routes"
import { directusClient } from "@/classes/directus-client"

import type { TransformFormat } from "./blurhash"
import type { Lang } from "./lang"
import type { DirectusFile } from "@directus/sdk"
import type { SlateDescendant } from "@mattiaz9/slate-jsx"
import type { Path } from "slate"
import type { ImageElement, LeafElement } from "slate-blocks/textual"

export interface AstroImageAsset {
  attributes: astroHTML.JSX.ImgHTMLAttributes
  blurhash: string
}

export interface AstroSvgAsset {
  svg: string | null
}

export interface AstroFileAsset {
  url: string | null
  type: string | null
}

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

export async function parseRemoteImage(src: string, maxWidth?: number) {
  const output = await getImage({
    src,
    width: maxWidth,
  })

  let blurhash = FallbackBlurhash
  if (output.attributes.width && output.attributes.height) {
    blurhash = await serverImageToBlurhash({
      src,
      width: maxWidth ?? 1000,
      height: maxWidth ?? 1000,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      format: (output.options.format as TransformFormat) ?? "jpeg",
    })
  }

  return {
    attributes: {
      ...(output.attributes as astroHTML.JSX.ImgHTMLAttributes),
      src: output.src,
      srcSet: output.srcSet.attribute,
    },
    blurhash,
  }
}

/**
 * Parse image node to fluid image
 */
type InputImage = Pick<DirectusFile<DirectusSchema>, "id" | "title" | "type" | "width" | "height">

export async function parseFluidImage(
  imageOrId: UUID | InputImage | null,
  alt?: string,
  maxWidth?: number
) {
  if (!imageOrId) return null

  let image: InputImage | null = null

  if (typeof imageOrId === "string") {
    image = await directusClient.request(
      readFile(imageOrId, {
        fields: ["id", "title", "type", "width", "height"],
      })
    )
  } else {
    image = imageOrId
  }

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
  const ratio = width / height

  const src = getDirectusAssetUrl(image.id)
  const [output, blurhash] = await Promise.all([
    getImage({
      src,
      alt: alt ?? image.title ?? "",
      width: maxWidth ?? width,
      height: maxWidth ? maxWidth / ratio : height,
      format,
    }),
    serverImageToBlurhash({
      src,
      width,
      height,
      format,
    }),
  ])

  return {
    attributes: {
      ...(output.attributes as astroHTML.JSX.ImgHTMLAttributes),
      src: output.src,
      srcSet: output.srcSet.attribute,
    },
    blurhash,
  }
}

export const loadSvgAsset = async (fileId: UUID | null): Promise<AstroSvgAsset> => {
  let svg: string | null = null

  try {
    if (!fileId) throw new Error("No file ID")

    const url = getDirectusAssetUrl(fileId)
    const resp = await fetch(url)

    if (!resp.ok) throw new Error(`Failed to fetch ${url}`)

    svg = await resp.text()
  } catch (error) {
    //
  }

  return {
    svg,
  }
}

export const resolveSlateContent = async (
  content: SlateDescendant[],
  opts: { lang: Lang; fallbackLang: Lang; maxWidth?: number }
): Promise<SlateDescendant[]> => {
  const imagePromises: ReturnType<typeof loadImage>[] = []
  const linkPromises: ReturnType<typeof loadLink>[] = []

  const walkChildren = (children: SlateDescendant[], path: Path) => {
    for (const [i, child] of children.entries()) {
      if (Leaf.assert(child) && child.to) {
        linkPromises.push(loadLink(child, path, opts))
      }
      if (Element.isElement(child) && "src" in child && Boolean(child.src)) {
        imagePromises.push(loadImage(child as unknown as ImageElement, path, opts))
      }
      if (Element.isElement(child)) {
        walkChildren(child.children as SlateDescendant[], [...path, i])
      }
    }
  }

  walkChildren(content, [])

  const imagesResults = await Promise.all(imagePromises)
  const linksResults = await Promise.all(linkPromises)

  for (const [element, path] of [...imagesResults, ...linksResults]) {
    let currentElement

    for (const pathIndex of path) {
      if (Element.isElement(currentElement)) {
        currentElement = currentElement.children[pathIndex]
      } else {
        currentElement = undefined
        break
      }
    }

    if (currentElement) {
      currentElement = element
    }
  }

  return content
}

export const loadImage = async (element: ImageElement, path: Path, opts: { maxWidth?: number }) => {
  if (element.src) {
    const isIdSource = /^[a-z0-9-]+$/.test(element.src)

    const result = isIdSource
      ? await parseFluidImage(element.src, undefined, opts.maxWidth)
      : await parseRemoteImage(element.src, opts.maxWidth)
    element.src = result?.attributes.src ?? undefined
    element.blurhash = result?.blurhash ?? undefined
    element.alt = element.alt ?? result?.attributes.alt ?? undefined
    element.caption = element.caption ?? result?.attributes.title ?? undefined
    element.width = Number(element.width ?? result?.attributes.width ?? 1000)
    element.height = Number(element.height ?? result?.attributes.height ?? 1000)
  }

  return [element, path] as const
}

export const loadLink = async (
  element: LeafElement,
  path: Path,
  opts: { lang: Lang; fallbackLang: Lang }
) => {
  if (element.to) {
    const { id, type } = element.to
    switch (type) {
      case "blog_articles":
      case "pages":
      case "projects": {
        const result = await directusClient.request(
          readItem(type, id, {
            fields: [
              {
                translations: ["slug", "locale"],
              },
            ],
          })
        )
        const bestTranslation = findTranslation(
          result.translations ?? [],
          opts.lang,
          opts.fallbackLang
        )
        element.href = routes.blogPostPath(
          bestTranslation.slug,
          localeToLang(bestTranslation.locale)
        )
        break
      }
      default: {
        element.href = undefined
        break
      }
    }
  }

  return [element, path] as const
}

export const getExternalAsset = async (
  fileId: UUID | null,
  filename?: string | null
): Promise<AstroFileAsset | null> => {
  if (!fileId) return null

  const fileResult = await directusClient.request(
    readFile(fileId, {
      fields: ["type", "title"],
    })
  )

  const href = getDirectusAssetUrl(fileId)
  const type = fileResult.type ?? null

  const url = getFile({
    src: href,
    filename: filename ?? fileResult.title ?? "unnamed",
    type,
  })

  return {
    url,
    type,
  }
}

export const localeToLang = (locale: Locale): Lang => {
  const lang = locale.split("-")[0] as Lang
  return lang
}
