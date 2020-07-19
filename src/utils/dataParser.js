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
    category: parseCategory(category),
    published_on,
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
 * Parse and group comments with replies
 *
 * @typedef {object} CommentNode
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} comment
 * @property {string} created_on
 * @property {string} locale
 * @property {number} parent
 * @property {number} post
 *
 * @typedef {object} Comment
 * @property {string} name
 * @property {string} email
 * @property {string} comment
 * @property {string} created_on
 * @property {string} locale
 * @property {Comment[]} replies
 *
 * @param {CommentNode[]} nodes Fetched comment nodes
 * @returns {Comment[]} Parsed and grouped comments
 */
export const parseComments = nodes => {
  return nodes
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
  const childNodes = nodes.filter(n => n.parent === node.id)
  const replies = childNodes.map(childNode => parseComment(childNode, nodes))

  delete node.id
  delete node.parent
  delete node.post

  return {
    ...node,
    replies
  }
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
