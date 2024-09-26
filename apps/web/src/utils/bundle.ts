import { getFile } from "astro-plugin-files"
import { getImage } from "astro:assets"

import { serverImageToBlurhash } from "./blurhash"
import { fetchPayloadRequest } from "./payload"
import { route } from "./routes"
import { DEFAULT_LOCALE } from "@/lang/consts"

import type { NodeType } from "./lexical"
import type { Locale } from "@/lang/types"
import type { AwardsBlock, Form, Media, Page, Post } from "@payload-types"
import type { LinkFields } from "@payloadcms/richtext-lexical"
import type { GetImageResult } from "astro"

export interface BundledImage extends GetImageResult {
  originalSrc: string
  blurhash?: string
}

export interface BundledFile {
  url: string
  filename: string
  type: string
}

export interface BundledUploadFields {
  image?: BundledImage
  file?: BundledFile
}

export async function bundleCmsImage(
  img: string | Media | null | undefined,
): Promise<BundledImage | undefined> {
  if (!img) {
    return undefined
  }

  if (typeof img === "string") {
    img = await fetchPayloadRequest<Media>({
      method: "GET",
      path: `/media/${img}`,
    })
  }

  if (img.mimeType && !img.mimeType.startsWith("image")) {
    return undefined
  }

  const isClient = typeof window !== "undefined"
  const src = `${import.meta.env.PUBLIC_PAYLOAD_URL}${img.url}`
  const result = isClient
    ? ({
        src,
        srcSet: { attribute: "srcset", values: [] },
        attributes: {
          alt: img.alt,
        },
        options: {
          format: img.mimeType?.split("/")[1] ?? "jpeg",
          height: img.height ?? 0,
          width: img.width ?? 0,
          src,
        },
        rawOptions: {
          src,
        },
      } satisfies GetImageResult)
    : await getImage({ src, alt: img.alt })
  const blurhash = await serverImageToBlurhash({
    src: result.src,
    format: result.options.format,
    height: result.options.height,
    width: result.options.width,
  })

  return {
    ...result,
    originalSrc: src,
    blurhash: blurhash,
  }
}

export async function bundleCmsFile(
  file: string | Media | null | undefined,
): Promise<BundledFile | undefined> {
  if (!file) {
    return undefined
  }

  if (typeof file === "string") {
    file = await fetchPayloadRequest<Media>({
      method: "GET",
      path: `/media/${file}`,
    })
  }

  if (file.mimeType && file.mimeType.startsWith("image")) {
    return undefined
  }

  const isClient = typeof window !== "undefined"
  const src = `${import.meta.env.PUBLIC_PAYLOAD_URL}${file.url}`
  const type = file.mimeType ?? "application/octet-stream"
  const filename = file.filename ?? "unnamed"

  const url = isClient
    ? src
    : getFile({
        src,
        filename,
        type,
      })

  return {
    url,
    filename,
    type,
  }
}

export async function bundleMedia(
  media: string | Media | null | undefined,
  locale: Locale,
  accessToken?: string,
) {
  if (!media) {
    return undefined
  }

  if (typeof media === "string") {
    media = await fetchPayloadRequest<Media>({
      method: "GET",
      path: `/media/${media}`,
      params: { locale },
      accessToken,
    })
  }

  media.bundled = {
    image: await bundleCmsImage(media),
    file: await bundleCmsFile(media),
  }

  return media
}

type BlockLink = AwardsBlock["awards"][number]["link"]

export async function resolveInternalLink<T extends LinkFields | BlockLink>(
  link: T,
  locale: Locale,
  accessToken?: string,
): Promise<T> {
  if (!link) {
    return link
  }

  const linkType = "linkType" in link ? link.linkType : link.type

  if (linkType === "internal") {
    const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`
    const relationTo = "doc" in link ? link.doc?.relationTo : link.reference?.relationTo
    const docValue = "doc" in link ? link.doc?.value : link.reference?.value

    switch (relationTo) {
      case "pages": {
        const page =
          typeof docValue === "string"
            ? await fetchPayloadRequest<Page>({
                method: "GET",
                path: `/pages/${docValue}`,
                params: { locale },
                accessToken,
              })
            : (docValue as unknown as Page)
        link.url =
          prefix +
          route("/:path", {
            path: page.breadcrumbs?.at(-1)?.url ?? page.slug ?? "",
          })
        break
      }
      case "posts": {
        const post =
          typeof docValue === "string"
            ? await fetchPayloadRequest<Post>({
                method: "GET",
                path: `/posts/${docValue}`,
                params: { locale },
                accessToken,
              })
            : (docValue as unknown as Post)
        link.url =
          prefix +
          route("/blog/:slug", {
            slug: post.slug ?? "",
          })
        break
      }
      default:
        break
    }
  }

  return link
}

export async function bundleLexical(nodes: NodeType[], locale: Locale, accessToken?: string) {
  for (const node of nodes) {
    switch (node.type) {
      case "link": {
        node.fields = await resolveInternalLink(node.fields, locale, accessToken)
        break
      }
      case "upload": {
        const media = await fetchPayloadRequest<Media>({
          method: "GET",
          path: `/media/${node.id}`,
          params: { locale },
          accessToken,
        })
        node.fields = {
          image: await bundleCmsImage(media),
          file: await bundleCmsFile(media),
        } satisfies BundledUploadFields
        break
      }
      default:
        break
    }

    if (node.children) {
      await bundleLexical(node.children as NodeType[], locale, accessToken)
    }
  }

  return nodes
}

export async function bundleBlocks(blocks: Page["layout"], locale: Locale, accessToken?: string) {
  for (const block of blocks ?? []) {
    switch (block.blockType) {
      case "awards": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.awards = await Promise.all(
          block.awards.map(async (award) => {
            award.logo = (await bundleMedia(award.logo, locale, accessToken)) as Media
            award.link = await resolveInternalLink(award.link, locale, accessToken)
            return award
          }),
        )
        break
      }
      case "bento": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.items = await Promise.all(
          (block.items ?? []).map(async (item) => {
            item.background.backgroundImage = await bundleMedia(
              item.background.backgroundImage,
              locale,
              accessToken,
            )
            item.link = await resolveInternalLink(item.link, locale, accessToken)
            return item
          }),
        )
        break
      }
      case "brand": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.logos = await Promise.all(
          (block.logos ?? []).map(async (logo) => {
            logo.pngLogo = (await bundleMedia(logo.pngLogo, locale, accessToken)) as Media
            logo.svgLogo = (await bundleMedia(logo.svgLogo, locale, accessToken)) as Media
            return logo
          }),
        )
        break
      }
      case "clients": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.clients = await Promise.all(
          (block.clients ?? []).map(async (client) => {
            client.logo = (await bundleMedia(client.logo, locale, accessToken)) as Media
            client.link = await resolveInternalLink(client.link, locale, accessToken)
            return client
          }),
        )
        break
      }
      case "cta": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.links = await Promise.all(
          (block.links ?? []).map(async (link) => {
            link.link = await resolveInternalLink(link.link, locale, accessToken)
            return link
          }),
        )
        break
      }
      case "faq": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        break
      }
      case "features": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.features = await Promise.all(
          (block.features ?? []).map(async (feature) => {
            feature.icon = (await bundleMedia(feature.icon, locale, accessToken)) as Media
            return feature
          }),
        )
        break
      }
      case "form": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.form =
          typeof block.form === "string"
            ? await fetchPayloadRequest<Form>({
                method: "GET",
                path: `/forms/${block.form}`,
                params: { locale },
                accessToken,
              })
            : block.form
        block.form.redirect = await resolveInternalLink(block.form.redirect, locale, accessToken)
        break
      }
      case "milestones": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.milestones = await Promise.all(
          (block.milestones ?? []).map(async (milestone) => {
            milestone.media = (await bundleMedia(milestone.media, locale, accessToken)) as Media
            return milestone
          }),
        )
        break
      }
      case "relatedPosts": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.relatedPosts = await Promise.all(
          (block.relatedPosts ?? []).map(async (post) => {
            post =
              typeof post === "string"
                ? await fetchPayloadRequest<Post>({
                    method: "GET",
                    path: `/posts/${post}`,
                    params: { locale },
                    accessToken,
                  })
                : post
            post.thumbnail = (await bundleMedia(post.thumbnail, locale, accessToken)) as Media
            return post
          }),
        )
        break
      }
      case "stats": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        break
      }
      case "testimonials": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.testimonials = await Promise.all(
          (block.testimonials ?? []).map(async (testimonial) => {
            testimonial.avatar = (await bundleMedia(
              testimonial.avatar,
              locale,
              accessToken,
            )) as Media
            testimonial.link = await resolveInternalLink(testimonial.link, locale, accessToken)
            return testimonial
          }),
        )
        break
      }
      case "text": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        break
      }
    }

    return blocks
  }
}
