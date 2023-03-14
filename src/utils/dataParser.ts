import { getImage } from "@astrojs/image"

import DirectusClient from "@/classes/DirectusClient"

import type {
  Category,
  Page,
  Post,
  Project,
  TeamMember,
  Comment,
  CommentOwner,
  Milestone,
} from "@/definitions/app"
import type {
  CategoryNode,
  CommentNode,
  FileNode,
  MilestoneNode,
  PageNode,
  PostNode,
  ProjectNode,
  TeamMemberNode,
} from "@/definitions/sources"

/**
 * Parse post nodes
 */
export const parsePosts = async (nodes: PostNode[], locale: string) => {
  return await Promise.all(nodes.map(post => parsePost(post, locale)))
}

/**
 * Parse a post node
 */
export const parsePost = async (node: PostNode, locale: string): Promise<Post> => {
  const { localized_contents, directusId, author, category, published_on, updated_on, image } = node
  const localizedPost =
    localized_contents.find(lc => lc.locale === locale) || localized_contents[0]!
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale,
  }))
  return {
    ...localizedPost,
    id: directusId,
    author,
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
export const parseCategories = async (nodes: CategoryNode[], locale: string) => {
  return await Promise.all(nodes.map(node => parseCategory(node, locale)))
}

/**
 * Parse category node
 */
export const parseCategory = async (node: CategoryNode, locale: string): Promise<Category> => {
  const { localized_contents } = node
  const localizedCategory =
    localized_contents.find(lc => lc.locale === locale) || localized_contents[0]!
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale,
  }))
  return {
    ...localizedCategory,
    allSlugs,
  }
}

/**
 * Parse a list of project nodes
 */
export const parseProjects = async (nodes: ProjectNode[], locale: string) => {
  return await Promise.all(nodes.map(node => parseProject(node, locale)))
}

/**
 * Parse project node
 */
export const parseProject = async (node: ProjectNode, locale: string): Promise<Project> => {
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
export const parseMilestones = async (nodes: MilestoneNode[], locale: string) => {
  return await Promise.all(nodes.map(node => parseMilestone(node, locale)))
}

/**
 * Parse milestone node
 */
export const parseMilestone = async (node: MilestoneNode, locale: string): Promise<Milestone> => {
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
export const parsePages = async (nodes: PageNode[], locale: string) => {
  return await Promise.all(nodes.map(node => parsePage(node, locale)))
}

/**
 * Parse page node
 */
export const parsePage = async (node: PageNode, locale: string): Promise<Page> => {
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
export const parseTeam = async (nodes: TeamMemberNode[], locale: string) => {
  return await Promise.all(nodes.map(node => parseTeamMember(node, locale)))
}

/**
 * Parse team member node
 */
export const parseTeamMember = async (
  node: TeamMemberNode,
  locale: string
): Promise<TeamMember> => {
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

  const avatarData = node.owner?.avatar as FileNode | undefined
  const ownerAvatar = avatarData?.data.thumbnails.find(t => t.key === "directus-medium-crop")

  const owner = node.owner
    ? ({
        id: node.owner.id,
        name: `${node.owner.first_name} ${node.owner.last_name}`.trim(),
        email: node.owner.email,
        avatar: ownerAvatar && ownerAvatar.url,
      } as CommentOwner)
    : null

  return {
    id: node.id,
    name: node.name,
    email: node.email,
    comment: node.comment,
    created_on: node.created_on,
    locale: typeof node.locale === "string" ? node.locale : node.locale.code,
    owner,
    replies,
  }
}

/**
 * Parse image node to  fluid image
 */
export const parseFluidImage = async (node: FileNode | null, alt?: string) => {
  const mimeType = node?.filename_disk?.split(".").pop() ?? "jpeg"
  const format = mimeType === "png" ? "png" : mimeType === "svg" ? "svg" : "jpeg"
  return node
    ? await getImage({
        src: new DirectusClient().getFileUrl(node.private_hash),
        alt: alt ?? node.description,
        width: node.width || 1000,
        height: node.height || 1000,
        format,
      })
    : null
}
