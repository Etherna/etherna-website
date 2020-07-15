import { DEFAULT_LOCALE } from "./lang"

/**
 * Blog post path
 * @param {string} slug Post slug
 * @return {string} Post path
 */
const blogPostPath = slug => {
  return `/blog/${slug}`
}

/**
 * Blog category path
 * @param {string} slug Category slug
 * @param {string} locale Category locale
 * @return {string} Category path
 */
const blogCategoryPath = (slug, locale = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/category/${slug}`
    : `/category/${locale}/${slug}`
}

export default {
  blogPostPath,
  blogCategoryPath
}
