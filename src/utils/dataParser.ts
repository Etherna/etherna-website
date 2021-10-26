import {
  Category,
  Page,
  Post,
  Project,
  TeamMember,
  Comment,
  CommentOwner,
  Milestone
} from "@definitions/app"
import {
  CategoryNode,
  CommentNode,
  FileNode,
  GatsbyImageData,
  ImageNode,
  MilestoneNode,
  PageNode,
  PostNode,
  ProjectNode,
  TeamMemberNode
} from "@definitions/sources"

/**
 * Parse post nodes
 */
export const parsePosts = (nodes: PostNode[], locale: string) => {
  return nodes.map(post => parsePost(post, locale))
}

/**
 * Parse a post node
 */
export const parsePost = (node: PostNode, locale: string): Post => {
  const {
    localized_contents,
    directusId,
    author,
    category,
    published_on,
    updated_on,
    image
  } = node
  const localizedPost = localized_contents.find(lc => lc.locale === locale)
    || localized_contents[0]
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale
  }))
  return {
    ...localizedPost,
    id: directusId,
    author,
    category: category ? parseCategory(category, locale) : null,
    published_on,
    updated_on,
    image: parseFluidImage(image),
    allSlugs
  }
}

/**
 * Parse a list of category nodes
 */
export const parseCategories = (nodes: CategoryNode[], locale: string) => {
  return nodes.map(node => parseCategory(node, locale))
}

/**
 * Parse category node
 */
export const parseCategory = (node: CategoryNode, locale: string): Category => {
  const { localized_contents } = node
  const localizedCategory = localized_contents.find(lc => lc.locale === locale)
    || localized_contents[0]
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale
  }))
  return {
    ...localizedCategory,
    allSlugs
  }
}

/**
 * Parse a list of project nodes
 */
export const parseProjects = (nodes: ProjectNode[], locale: string) => {
  return nodes.map(node => parseProject(node, locale))
}

/**
 * Parse project node
 */
export const parseProject = (node: ProjectNode, locale: string): Project => {
  const {
    localized_contents,
    coming_soon,
    github_link,
    image
  } = node
  const localizedCategory = localized_contents.find(lc => lc.locale === locale)
    || localized_contents[0]
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale
  }))
  return {
    ...localizedCategory,
    coming_soon,
    github_link,
    image,
    allSlugs
  }
}

/**
 * Parse a list of milestone nodes
 */
export const parseMilestones = (nodes: MilestoneNode[], locale: string) => {
  return nodes.map(node => parseMilestone(node, locale))
}

/**
 * Parse milestone node
 */
export const parseMilestone = (node: MilestoneNode, locale: string): Milestone => {
  const {
    localized_contents,
    image,
    completion,
    completion_quarter,
    latitude,
    longitude
  } = node
  const localizedCategory = localized_contents.find(lc => lc.locale === locale)
    || localized_contents[0]
  return {
    ...localizedCategory,
    image: parseFluidImage(image),
    completion,
    completion_quarter,
    latitude,
    longitude
  }
}

/**
 * Parse a list of page nodes
 */
export const parsePages = (nodes: PageNode[], locale: string) => {
  return nodes.map(node => parsePage(node, locale))
}

/**
 * Parse page node
 */
export const parsePage = (node: PageNode, locale: string): Page => {
  const { localized_contents } = node
  const localizedContents = localized_contents.find(lc => lc.locale === locale)
    || localized_contents[0]
  const allSlugs = localized_contents.map(lc => ({
    slug: lc.slug,
    locale: lc.locale
  }))
  return {
    ...localizedContents,
    allSlugs
  }
}

/**
 * Parse a list of team members nodes
 */
export const parseTeam = (nodes: TeamMemberNode[], locale: string) => {
  return nodes.map(node => parseTeamMember(node, locale))
}

/**
 * Parse team member node
 */
export const parseTeamMember = (node: TeamMemberNode, locale: string): TeamMember => {
  const { localized_contents, name, photo } = node
  const localizedContents = localized_contents.find(lc => lc.locale === locale)
    || localized_contents[0]
  return {
    name,
    ...localizedContents,
    photo: parseFluidImage(photo)!
  }
}

/**
 * Parse and group comments with replies
 */
export const parseComments = (nodes: CommentNode[]) => {
  return [...nodes]
    .filter(node => node.parent === null)
    .map(node => parseComment(node, nodes))
}

/**
 * Parse a comment node and add child comments
 */
export const parseComment = (node: CommentNode, nodes: CommentNode[]): Comment => {
  const childNodes = nodes.filter(
    n => typeof n.parent === "number"
      ? n.parent === node.id
      : (n.parent || {}).id === node.id
  )
  const replies = childNodes.map(childNode => parseComment(childNode, nodes))

  const avatarData = node.owner?.avatar as FileNode | undefined
  const ownerAvatar = avatarData?.data.thumbnails.find(t => t.key === "directus-medium-crop")

  const owner = node.owner ? {
    id: node.owner.id,
    name: `${node.owner.first_name} ${node.owner.last_name}`.trim(),
    email: node.owner.email,
    avatar: ownerAvatar && ownerAvatar.url
  } as CommentOwner : null

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
export const parseFluidImage = (node: ImageNode | null): GatsbyImageData | null => {
  if (
    !node ||
    !node.localFile ||
    !node.localFile.childImageSharp ||
    !node.localFile.childImageSharp.gatsbyImageData
  ) return null

  return node.localFile.childImageSharp.gatsbyImageData
}

export const parseGatsbyImageSource = (image: GatsbyImageData | null | undefined) => {
  if (image && image.images.sources) {
    const sources = image.images.sources.filter(src => !src.type || !["image/avif", "image/webp"].includes(src.type))
    const src = sources[0]?.srcSet.split(",")[0].replace(/\n/, "")
    const srcParts = src?.split(" ")
    return srcParts?.[0]
  }
  return null
}
