import { DEFAULT_LOCALE, Languages } from "./lang"

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
  return withLocale(`/blog`, locale)
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
  return withLocale(`/${segment}`, locale)
}

/**
 * Brand kit path
 * @param locale Brand kit locale
 * @returns Brand kit path
 */
const brandKitPath = (locale: Lang) => {
  return withLocale(`/brand-kit`, locale)
}

/**
 * Thank you page path
 * @param locale Brand kit locale
 * @returns Thank you path
 */
const thankyouPath = () => {
  return `/thankyou`
}

/**
 * Success page path
 * @param locale Brand kit locale
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
  return withLocale(`/blog/${slug}`, locale)
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
  return withLocale(`/blog/${segment}/${slug}`, locale)
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
  return withLocale(`/${segment}/${slug}`, locale)
}

/**
 * Page path
 * @param slug Page slug
 * @param locale Category locale
 * @returns Page path
 */
const pagePath = (slug: string, locale: Lang = DEFAULT_LOCALE) => {
  return withLocale(`/${slug}`, locale)
}

const routesIdentifiers = {
  unlocalized: {
    "thank-you": thankyouPath,
    success: successPath,
  },
  localized: {
    home: homePath,
    blog: blogPath,
    about: aboutPath,
    "brand-kit": brandKitPath,
  },
  dynamicLocalized: {
    post: blogPostPath,
    category: blogCategoryPath,
    project: projectPath,
    page: pagePath,
  },
} as const

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

export const withLocale = (path: string, locale: Lang) => {
  path = path.replace(/^\/?$/, "/")
  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`
}

export const withPagination = (path: string, page: number) => {
  return page === 1 ? path : `${path}/p/${page}`
}

export const withoutPagination = (path: string) => {
  return path.replace(/\/?$/, "").replace(/(\/p\/(\d+))?$/, "")
}

export const parseSlug = (path: string) => {
  const slug = path
    .replace(/\/?$/, "")
    .replace(/(\/p\/(\d+))?$/, "")
    .split("/")
    .pop()
  return slug || null
}

export const parsePage = (path: string) => {
  const pageSegment = path.replace(/\/?$/, "").match(/\/p\/(\d+)$/)?.[1]
  return pageSegment ? parseInt(pageSegment) : null
}

/**
 * Get route identifier from path and lang
 * @param path Path to decode
 * @param lang Locale code
 */
export const whichRoute = (path: string, lang: Lang) => {
  const routesGroups = Object.keys(routesIdentifiers) as (keyof typeof routesIdentifiers)[]
  const normalizedPath =
    withLocale(
      withoutPagination(path).replace(/^\/?/, "/").replace(/\/?$/, "") || "/",
      lang
    ).replace(/\/$/, "") || "/"

  for (const code of Languages) {
    for (const group of routesGroups) {
      const identifiers = Object.keys(routesIdentifiers[group])

      for (const identifier of identifiers) {
        let route: string
        const slug = parseSlug(path)

        switch (group) {
          case "unlocalized":
            route =
              routesIdentifiers.unlocalized[
                identifier as keyof typeof routesIdentifiers.unlocalized
              ]()
            break
          case "localized":
            route =
              routesIdentifiers.localized[identifier as keyof typeof routesIdentifiers.localized](
                code
              )
            break
          case "dynamicLocalized":
            route = routesIdentifiers.dynamicLocalized[
              identifier as keyof typeof routesIdentifiers.dynamicLocalized
            ](slug ?? "", code)
            break
        }

        if (normalizedPath === route) {
          return identifier as keyof (typeof routesIdentifiers.localized &
            typeof routesIdentifiers.dynamicLocalized &
            typeof routesIdentifiers.unlocalized)
        }
      }
    }
  }

  throw new Error("Route not found")
}

export default routes
