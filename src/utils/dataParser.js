/**
 * Parse post nodes
 *
 * @typedef {object} PostLocalizedContentsNode
 * @property {string} locale
 * @property {string} title
 * @property {string} slug
 * @property {string} content
 * @property {string} excerpt
 * @property {string} meta_description
 * @property {string} meta_keywords
 *
 * @typedef {object} CategoryLocalizedContentsNode
 * @property {string} name
 * @property {string} slug
 * @property {string} locale
 *
 * @typedef {object} AuthorNode
 * @property {string} first_name
 * @property {string} last_name
 * @property {number} avatar
 *
 * @typedef {object} CategoryNode
 * @property {CategoryLocalizedContentsNode[]} localized_contents
 *
 * @typedef {object} PostNode Post node object
 * @property {PostLocalizedContentsNode[]} localized_contents,
 * @property {AuthorNode} author
 * @property {CategoryNode} category
 * @property {number} directusId
 * @property {string} published_on
 * @property {string} updated_on
 * @property {object} image
 *
 * @typedef {object} LocaleSlug Define other slug with locale
 * @property {string} slug
 * @property {string} locale
 *
 * @typedef {object} Category Category object
 * @property {string} name
 * @property {string} slug
 * @property {string} locale
 * @property {LocaleSlug[]} allSlugs
 *
 * @typedef {object} Post Post object
 * @property {number} id
 * @property {string} title
 * @property {string} slug
 * @property {string} content
 * @property {string} excerpt
 * @property {string} locale
 * @property {string} meta_description
 * @property {string} meta_keywords
 * @property {AuthorNode} author
 * @property {Category} category
 * @property {string} published_on
 * @property {string} updated_on
 * @property {FluidImage} image
 * @property {LocaleSlug[]} allSlugs
 *
 * @param {PostNode[]} nodes Post node list
 * @param {string} locale Current locale
 * @returns {Post[]} Post object list
 */
export const parsePosts = (nodes, locale) => {
  return nodes.map(post => parsePost(post, locale))
}

/**
 * Parse a post node
 *
 * @param {PostNode} node Post node
 * @param {string} locale Current locale
 * @returns {Post} Post object
 */
export const parsePost = (node, locale) => {
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
    category: parseCategory(category, locale),
    published_on,
    updated_on,
    image: parseFluidImage(image),
    allSlugs
  }
}

/**
 * Parse a list of category nodes
 *
 * @param {CategoryNode[]} nodes Category nodes
 * @param {string} locale Current locale
 * @returns {Category[]} Parsed categories
 */
export const parseCategories = (nodes, locale) => {
  return nodes.map(node => parseCategory(node, locale))
}

/**
 * Parse category node
 *
 * @param {CategoryNode} node Category node
 * @param {string} locale Current locale
 * @returns {Category} Category object
 */
export const parseCategory = (node, locale) => {
  if (!node) return

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
 * @typedef {object} ProjectLocalizedContentsNode
 * @property {string} locale
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string} meta_description
 * @property {string} meta_keywords
 *
 * @typedef {object} ProjectNode
 * @property {ProjectLocalizedContentsNode} localized_contents
 * @property {boolean} coming_soon
 * @property {string} github_link
 * @property {object} image
 *
 * @typedef {object} PublicImageNode
 * @property {object} localFile
 * @property {string} localFile.publicURL
 *
 * @typedef {object} Project
 * @property {string} locale
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string} meta_description
 * @property {string} meta_keywords
 * @property {boolean} coming_soon
 * @property {string} github_link
 * @property {PublicImageNode} image
 * @property {LocaleSlug[]} allSlugs
 *
 * Parse project node
 * @param {ProjectNode} node Project node
 * @param {string} locale Current locale
 * @returns {Project} Project object
 */
export const parseProject = (node, locale) => {
  if (!node) return

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
 * Parse a list of project nodes
 *
 * @param {ProjectNode[]} nodes Project nodes
 * @param {string} locale Current locale
 * @returns {Project[]} Parsed projects
 */
export const parseProjects = (nodes, locale) => {
  return nodes.map(node => parseProject(node, locale))
}




/**
 * @typedef {object} PageLocalizedContentsNode
 * @property {string} locale
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string} meta_description
 * @property {string} meta_keywords
 *
 * @typedef {object} PageNode
 * @property {PageLocalizedContentsNode} localized_contents
 *
 * @typedef {object} Page
 * @property {string} locale
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string} meta_description
 * @property {string} meta_keywords
 * @property {LocaleSlug[]} allSlugs
 *
 * Parse page node
 * @param {PageNode} node Page node
 * @param {string} locale Current locale
 * @returns {Page} Page object
 */
export const parsePage = (node, locale) => {
  if (!node) return

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
 * Parse a list of page nodes
 *
 * @param {PageNode[]} nodes Pages nodes
 * @param {string} locale Current locale
 * @returns {Page[]} Parsed pages
 */
export const parsePages = (nodes, locale) => {
  return nodes.map(node => parseProject(node, locale))
}

/**
 * Parse and group comments with replies
 *
 * @typedef {object} ImageThumbnailNode
 * @property {string} key
 * @property {string} dimension
 * @property {string} url
 *
 * @typedef {object} FileNode
 * @property {string} title
 * @property {string} filename_disk
 * @property {object} data
 * @property {string} data.url
 * @property {string} data.full_url
 * @property {ImageThumbnailNode[]} data.thumbnails
 *
 * @typedef {object} UserNode
 * @property {number} id
 * @property {FileNode} avatar
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 *
 * @typedef {object} CommentOwner
 * @property {number} id
 * @property {string} avatar
 * @property {string} name
 * @property {string} email
 *
 * @typedef {object} CommentNode
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} comment
 * @property {string} created_on
 * @property {string|{code:string}} locale
 * @property {CommentNode|number} parent
 * @property {PostNode|number} post
 * @property {UserNode} owner
 *
 * @typedef {object} Comment
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} comment
 * @property {string} created_on
 * @property {string} locale
 * @property {CommentOwner} owner
 * @property {Comment[]} replies
 *
 * @param {CommentNode[]} nodes Fetched comment nodes
 * @returns {Comment[]} Parsed and grouped comments
 */
export const parseComments = nodes => {
  return [...nodes]
    .filter(node => node.parent === null)
    .map(node => parseComment(node, nodes))
}

/**
 * Parse a comment node and add child comments
 *
 * @param {CommentNode} node Main comment node
 * @param {CommentNode[]} nodes Full node list of comments
 * @return {Comment} Parsed comment
 */
export const parseComment = (node, nodes) => {
  const childNodes = nodes.filter(n => n.parent === node.id || (n.parent || {}).id === node.id)
  const replies = childNodes.map(childNode => parseComment(childNode, nodes))

  const ownerAvatar =
    node.owner &&
    node.owner.avatar &&
    node.owner.avatar.data.thumbnails.find(t => t.key === "directus-medium-crop")

  const owner = node.owner && {
    id: node.owner.id,
    name: `${node.owner.first_name} ${node.owner.last_name}`.trim(),
    email: node.owner.email,
    avatar: ownerAvatar && ownerAvatar.url
  }

  const comment = {
    id: node.id,
    name: node.name,
    email: node.email,
    comment: node.comment,
    created_on: node.created_on,
    locale: node.locale.code || node.locale,
    owner,
    replies,
  }

  return comment
}

/**
 * Parse image node to  fluid image
 *
 * @typedef {object} ImageNode Image node
 * @property {object} localFile
 * @property {object} localFile.childImageSharp
 * @property {object} localFile.childImageSharp.fluid
 * @property {number} localFile.childImageSharp.fluid.aspectRatio
 * @property {string} localFile.childImageSharp.fluid.base64
 * @property {string} localFile.childImageSharp.fluid.originalImg
 * @property {string} localFile.childImageSharp.fluid.src
 * @property {string} localFile.childImageSharp.fluid.srcSet
 * @property {string} localFile.childImageSharp.fluid.sizes
 * @property {number} localFile.childImageSharp.fluid.presentationHeight
 * @property {number} localFile.childImageSharp.fluid.presentationWidth
 *
 * @typedef {object} FluidImage Fluid image
 * @property {number} aspectRatio
 * @property {string} base64
 * @property {string} originalImg
 * @property {string} src
 * @property {string} srcSet
 * @property {string} sizes
 * @property {number} presentationHeight
 * @property {number} presentationWidth
 *
 * @param {ImageNode} node Image node
 * @returns {FluidImage} Fluid image object
 */
export const parseFluidImage = node => {
  if (
    !node ||
    !node.localFile ||
    !node.localFile.childImageSharp ||
    !node.localFile.childImageSharp.fluid
  ) return

  return node.localFile.childImageSharp.fluid
}
