import { getImage } from "@astrojs/image"

import { getDirectusAssetUrl } from "./assets"
import { serverImageToBlurhash } from "./blurhash"

import type { Lang } from "./lang"
import type {
  AstroImg,
  Brand,
  Category,
  Comment,
  CommentOwner,
  Milestone,
  Page,
  Post,
  Project,
  TeamMember,
  User,
} from "@/schema/app"
import type {
  BrandNode,
  CategoryNode,
  CommentNode,
  FileNode,
  MilestoneNode,
  PageNode,
  PostNode,
  ProjectNode,
  TeamMemberNode,
  UserNode,
} from "@/schema/cms"

/**
 * Parse post nodes
 */
export const parsePosts = (nodes: PostNode[], locale: Lang) => {
  return Promise.all(nodes.map(post => parsePost(post, locale)))
}

/**
 * Parse a post node
 */
export const parsePost = async (node: PostNode, locale: Lang): Promise<Post> => {
  const { localized_contents, id, author, category, published_on, updated_on, image } = node
  const localizedPost =
    localized_contents.find(lc => lc.locale === locale) || localized_contents[0]!
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale,
  }))
  return {
    ...localizedPost,
    id,
    author: await parseUser(author),
    category: category ? await parseCategory(category, locale) : null,
    published_on,
    updated_on,
    image: await parseFluidImage(image),
    allSlugs,
  }
}

/**
 * Parse a list of category nodes
 */
export const parseCategories = async (nodes: CategoryNode[], locale: Lang) => {
  return await Promise.all(nodes.map(node => parseCategory(node, locale)))
}

/**
 * Parse category node
 */
export const parseCategory = async (node: CategoryNode, locale: Lang): Promise<Category> => {
  const { id, localized_contents, color } = node
  const localizedCategory = (localized_contents.find(lc => lc.locale === locale) ||
    localized_contents[0]) ?? {
    name: "",
    slug: "",
    locale,
  }
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale,
  }))
  return {
    id,
    color,
    ...localizedCategory,
    allSlugs,
  }
}

/**
 * Parse a list of project nodes
 */
export const parseProjects = async (nodes: ProjectNode[], locale: Lang) => {
  return await Promise.all(nodes.map(node => parseProject(node, locale)))
}

/**
 * Parse project node
 */
export const parseProject = async (node: ProjectNode, locale: Lang): Promise<Project> => {
  const { localized_contents, coming_soon, github_link, external_link, image } = node
  const localizedCategory =
    localized_contents.find(lc => lc.locale === locale) || localized_contents[0]!
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale,
  }))
  return {
    ...localizedCategory,
    coming_soon,
    github_link,
    external_link,
    image: await parseFluidImage(image),
    allSlugs,
  }
}

/**
 * Parse a list of milestone nodes
 */
export const parseMilestones = async (nodes: MilestoneNode[], locale: Lang) => {
  return await Promise.all(nodes.map(node => parseMilestone(node, locale)))
}

/**
 * Parse milestone node
 */
export const parseMilestone = async (node: MilestoneNode, locale: Lang): Promise<Milestone> => {
  const { localized_contents, image, completion, completion_quarter, latitude, longitude } = node
  const localizedCategory =
    localized_contents.find(lc => lc.locale === locale) || localized_contents[0]!
  return {
    ...localizedCategory,
    image: await parseFluidImage(image),
    completion,
    completion_quarter,
    latitude,
    longitude,
  }
}

/**
 * Parse a list of page nodes
 */
export const parsePages = async (nodes: PageNode[], locale: Lang) => {
  return await Promise.all(nodes.map(node => parsePage(node, locale)))
}

/**
 * Parse page node
 */
export const parsePage = async (node: PageNode, locale: Lang): Promise<Page> => {
  const { localized_contents, show_in_menu } = node
  const localizedContents =
    localized_contents.find(lc => lc.locale === locale) || localized_contents[0]!
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale,
  }))
  return {
    ...localizedContents,
    show_in_menu,
    allSlugs,
  }
}

/**
 * Parse a list of team members nodes
 */
export const parseTeam = async (nodes: TeamMemberNode[], locale: Lang) => {
  return await Promise.all(nodes.map(node => parseTeamMember(node, locale)))
}

/**
 * Parse team member node
 */
export const parseTeamMember = async (node: TeamMemberNode, locale: Lang): Promise<TeamMember> => {
  const { localized_contents, name, photo } = node
  const localizedContents =
    localized_contents.find(lc => lc.locale === locale) || localized_contents[0]!
  return {
    name,
    ...localizedContents,
    photo: (await parseFluidImage(photo))!,
  }
}

/**
 * Parse and group comments with replies
 */
export const parseComments = async (nodes: CommentNode[]) => {
  return await Promise.all(
    [...nodes].filter(node => node.parent === null).map(node => parseComment(node, nodes))
  )
}

/**
 * Parse a comment node and add child comments
 */
export const parseComment = async (node: CommentNode, nodes: CommentNode[]): Promise<Comment> => {
  const childNodes = nodes.filter(n =>
    typeof n.parent === "number" ? n.parent === node.id : (n.parent || {}).id === node.id
  )
  const replies = await Promise.all(childNodes.map(childNode => parseComment(childNode, nodes)))

  const avatarData = node.owner?.avatar
  const ownerAvatar = await parseFluidImage(avatarData, node.owner?.first_name, {
    width: 50,
    height: 50,
  })

  const owner = node.owner
    ? ({
        id: node.owner.id,
        name: `${node.owner.first_name} ${node.owner.last_name}`,
        email: node.owner.email,
        avatar: ownerAvatar,
      } as CommentOwner)
    : null

  return {
    id: node.id,
    name: node.name,
    email: node.email,
    comment: node.comment,
    created_on: node.created_on,
    locale: node.locale,
    owner,
    replies,
  }
}

/**
 * Parse user node
 */
export const parseUser = async (node: UserNode): Promise<User> => {
  return {
    ...node,
    avatar: typeof node.avatar === "object" ? await parseFluidImage(node.avatar) : null,
  }
}

/**
 * Parse brand node
 */
export const parseBrand = async (node: BrandNode): Promise<Brand> => {
  const { colors, fonts } = node
  const logos = await Promise.all(
    node.logos.map(async logo => ({
      ...logo,
      logo_variants: await Promise.all(
        logo.logo_variants.map(async variant => ({
          ...variant,
          image: (await parseFluidImage(variant.image))!,
        }))
      ),
    }))
  )
  return {
    colors,
    fonts,
    logos,
  }
}

/**
 * Parse image node to fluid image
 */
export const parseFluidImage = async (
  node: FileNode | null,
  alt?: string,
  size?: { width: number; height: number }
): Promise<AstroImg | null> => {
  if (!node) return null

  const mimeType = node.filename_disk.split(".").pop() ?? "jpeg"
  const formats = {
    jpeg: "jpeg",
    jpg: "jpeg",
    png: "png",
    svg: "svg",
  } as const
  const format = mimeType in formats ? formats[mimeType as keyof typeof formats] : "jpeg"

  const width = size?.width ?? node.width
  const height = size?.height ?? node.height

  const src = getDirectusAssetUrl(node.id)
  const attributes = await getImage({
    src,
    alt: alt ?? node.description,
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
