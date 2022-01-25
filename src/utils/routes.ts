import { DEFAULT_LOCALE } from "./lang"

/**
 * Home path
 * @param locale Home locale
 * @returns Home path
 */
const homePath = (locale: string) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/`
    : `/${locale}`
}

/**
 * Blog path
 * @param locale Blog locale
 * @returns Blog path
 */
const blogPath = (locale: string) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/blog`
    : `/${locale}/blog`
}

/**
 * About path
 * @param locale About locale
 * @returns About path
 */
const aboutPath = (locale: string) => {
  const aboutPaths: Record<string, string> = {
    it: "chi-siamo"
  }
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/about`
    : `/${locale}/${aboutPaths[locale] ?? "about"}`
}

/**
 * Thank you page path
 * @param email email
 * @returns Thank you path
 */
const thankyouPath = (email: string) => {
  return `/thankyou?e=${encodeURIComponent(email)}`
}

/**
 * Success page path
 * @returns Success path
 */
const successPath = () => {
  return `/success`
}

/**
 * Blog post path
 * @param slug Post slug
 * @param locale Category locale
 * @returns Post path
 */
const blogPostPath = (slug: string, locale = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/blog/${slug}`
    : `/${locale}/blog/${slug}`
}

/**
 * Blog category path
 * @param slug Category slug
 * @param locale Category locale
 * @returns Category path
 */
const blogCategoryPath = (slug: string, locale = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/blog/category/${slug}`
    : `/${locale}/blog/category/${slug}`
}

/**
 * Project path
 * @param slug Project slug
 * @param locale Category locale
 * @returns Project path
 */
const projectPath = (slug: string, locale = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/project/${slug}`
    : `/${locale}/project/${slug}`
}

/**
 * Page path
 * @param slug Page slug
 * @param locale Category locale
 * @returns Page path
 */
const pagePath = (slug: string, locale = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE || locale === ""
    ? `/${slug}`
    : `/${locale}/${slug}`
}

const routes = {
  homePath,
  blogPath,
  aboutPath,
  thankyouPath,
  successPath,
  blogPostPath,
  blogCategoryPath,
  projectPath,
  pagePath
}

export default routes
