import { DEFAULT_LOCALE } from "./lang"

/**
 * Home path
 * @param {string} locale Home locale
 * @return {string} Home path
 */
const homePath = locale => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/`
    : `/${locale}`
}

/**
 * Blog path
 * @param {string} locale Blog locale
 * @return {string} Blog path
 */
const blogPath = locale => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/blog`
    : `/${locale}/blog`
}

/**
 * Blog post path
 * @param {string} slug Post slug
 * @param {string} locale Category locale
 * @return {string} Post path
 */
const blogPostPath = (slug, locale = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/blog/${slug}`
    : `/${locale}/blog/${slug}`
}

/**
 * Blog category path
 * @param {string} slug Category slug
 * @param {string} locale Category locale
 * @return {string} Category path
 */
const blogCategoryPath = (slug, locale = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/blog/category/${slug}`
    : `/${locale}/blog/category/${slug}`
}

/**
 * Project path
 * @param {string} slug Project slug
 * @param {string} locale Category locale
 * @return {string} Project path
 */
const projectPath = (slug, locale = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/project/${slug}`
    : `/${locale}/project/${slug}`
}

export default {
  homePath,
  blogPath,
  blogPostPath,
  blogCategoryPath,
  projectPath
}
