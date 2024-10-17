import { getFile } from "astro-plugin-files"
import { getImage } from "astro:assets"

import { serverImageToBlurhash } from "./blurhash"
import { fetchPayloadRequest } from "./payload"
import { route } from "./routes"
import { localized } from "@/lang/utils"

import type { NodeType } from "./lexical"
import type { Locale } from "@/i18n/types"
import type { AwardsBlock, Form, Job, JobsBlock, Media, Page, Post } from "@payload-types"
import type { LinkFields } from "@payloadcms/richtext-lexical"
import type { GetImageResult } from "astro"
import type { PaginatedDocs } from "payload"

export interface BundledImage extends GetImageResult {
  originalSrc: string
  svgContent?: string
  blurhash?: string
  filename: string
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
    : await getImage({ src, alt: img.alt, inferSize: true })

  let blurhash
  let svgContent

  if (img.mimeType === "image/svg+xml") {
    // fix srcset for SVGs
    result.src = result.src.replace(/(webp|jpg|jpeg|png)/, "svg")

    svgContent = await fetch(src).then((res) => res.text())
  } else {
    blurhash = await serverImageToBlurhash({
      src,
      format: result.options.format,
      height: result.options.height,
      width: result.options.width,
    })
  }

  return {
    ...result,
    originalSrc: src,
    svgContent,
    blurhash,
    filename: img.filename ?? src.split("/").at(-1) ?? "unnamed",
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

type BlockLink =
  | Omit<NonNullable<AwardsBlock["awards"][number]["link"]>, "appearance">
  | null
  | undefined

export async function resolveInternalLink<T extends LinkFields | BlockLink>(
  link: T,
  locale: Locale,
  accessToken?: string,
): Promise<T> {
  if (!link) {
    return link
  }

  const linkType = "linkType" in link ? link.linkType : link.type

  if (linkType === "internal" || linkType === "reference") {
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
        link.url = localized(
          route("/:path", {
            path: (page.breadcrumbs?.at(-1)?.url ?? page.slug ?? "").replace(/^\//, ""),
          }),
          locale,
        )
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
        link.url = localized(
          route("/blog/:slug", {
            slug: (post.slug ?? "").replace(/^\//, ""),
          }),
          locale,
        )
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

type AnyBlock = NonNullable<Page["layout"]>[number]

export async function bundleBlocks(blocks: AnyBlock[], locale: Locale, accessToken?: string) {
  for (const block of blocks) {
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
      case "jobs": {
        const jobsBlock = block as JobsBlock & { jobs?: Job[] }
        jobsBlock.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        jobsBlock.jobs = await fetchPayloadRequest<PaginatedDocs<Job>>({
          method: "GET",
          path: "/jobs",
          accessToken,
          params: { locale, limit: 1000 },
        }).then((resp) => resp.docs)
        break
      }
      case "grid": {
        block.background.backgroundImage = await bundleMedia(
          block.background.backgroundImage,
          locale,
          accessToken,
        )
        block.rows = await Promise.all(
          (block.rows ?? []).map(async (row) => {
            row.items = await Promise.all(
              (row.items ?? []).map(async (item) => {
                item.background.backgroundImage = await bundleMedia(
                  item.background.backgroundImage,
                  locale,
                  accessToken,
                )
                item.link = await resolveInternalLink(item.link, locale, accessToken)
                return item
              }),
            )
            return row
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
        block.media = await bundleMedia(block.media, locale, accessToken)
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
      case "team": {
        block.members = await Promise.all(
          (block.members ?? []).map(async (member) => {
            member.photo = await bundleMedia(member.photo, locale, accessToken)
            return member
          }),
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
  }

  return blocks
}

export async function bundleHero(hero: Page["hero"], locale: Locale, accessToken?: string) {
  hero.backgroundImage = await bundleMedia(hero.backgroundImage, locale, accessToken)
  hero.badges = await Promise.all(
    (hero.badges ?? []).map(async (badge) => {
      badge.link = await resolveInternalLink(badge.link, locale, accessToken)
      return badge
    }),
  )
  hero.links = await Promise.all(
    (hero.links ?? []).map(async (link) => {
      link.link = await resolveInternalLink(link.link, locale, accessToken)
      return link
    }),
  )
  hero.media = await bundleMedia(hero.media, locale, accessToken)

  return hero
}

export function hasBundledImage(
  image: string | Media | null | undefined,
): image is Media & { bundled: { image: BundledImage } } {
  return typeof image === "object" && !!image?.bundled?.image
}
