import { DEFAULT_LOCALE } from "./lang"

import type { Lang } from "./lang"

/**
 * Home path
 * @param locale Home locale
 * @returns Home path
 */
const homePath = (locale: Lang) => {
  return locale === DEFAULT_LOCALE ? `/` : `/${locale}`
}

/**
 * Blog path
 * @param locale Blog locale
 * @returns Blog path
 */
const blogPath = (locale: Lang) => {
  return locale === DEFAULT_LOCALE ? `/blog` : `/${locale}/blog`
}

/**
 * About path
 * @param locale About locale
 * @returns About path
 */
const aboutPath = (locale: Lang) => {
  const localizedSegment = {
    en: "about",
    it: "chi-siamo",
  }
  const segment = localizedSegment[locale] ?? localizedSegment.en
  return locale === DEFAULT_LOCALE ? `/about` : `/${locale}/${segment}`
}

/**
 * Brand kit path
 * @param locale Brand kit locale
 * @returns Brand kit path
 */
const brandKitPath = (locale: Lang) => {
  return locale === DEFAULT_LOCALE ? `/brand-kit` : `/${locale}/brand-kit`
}

/**
 * Thank you page path
 * @returns Thank you path
 */
const thankyouPath = () => {
  return `/thankyou`
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
const blogPostPath = (slug: string, locale: Lang = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE ? `/blog/${slug}` : `/${locale}/blog/${slug}`
}

/**
 * Blog category path
 * @param slug Category slug
 * @param locale Category locale
 * @returns Category path
 */
const blogCategoryPath = (slug: string, locale: Lang = DEFAULT_LOCALE) => {
  const localizedSegment = {
    en: "categories",
    it: "categorie",
  }
  const segment = localizedSegment[locale] ?? localizedSegment.en
  return locale === DEFAULT_LOCALE
    ? `/blog/${segment}/${slug}`
    : `/${locale}/blog/${segment}/${slug}`
}

/**
 * Project path
 * @param slug Project slug
 * @param locale Category locale
 * @returns Project path
 */
const projectPath = (slug: string, locale: Lang = DEFAULT_LOCALE) => {
  const localizedSegment = {
    en: "projects",
    it: "progetti",
  }
  const segment = localizedSegment[locale] ?? localizedSegment.en
  return locale === DEFAULT_LOCALE ? `/${segment}/${slug}` : `/${locale}/${segment}/${slug}`
}

/**
 * Page path
 * @param slug Page slug
 * @param locale Category locale
 * @returns Page path
 */
const pagePath = (slug: string, locale: Lang = DEFAULT_LOCALE) => {
  return locale === DEFAULT_LOCALE ? `/${slug}` : `/${locale}/${slug}`
}

const routes = {
  homePath,
  blogPath,
  aboutPath,
  brandKitPath,
  thankyouPath,
  successPath,
  blogPostPath,
  blogCategoryPath,
  projectPath,
  pagePath,
}

export default routes
