import { DEFAULT_LOCALE, Languages } from "./lang"
import { withoutLocale } from "@/queries/fetch-paths"

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

const parseSlug = (path: string) => {
  const slug = path.split("/").pop()
  return slug || null
}

/**
 * Get route identifier from path and lang
 * @param path Path to decode
 * @param lang Locale code
 */
export const whichRoute = (path: string, lang: Lang) => {
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

  const routesGroups = Object.keys(routesIdentifiers) as (keyof typeof routesIdentifiers)[]

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
            ](slug, code)
            break
        }

        if (path === withoutLocale(route, lang)) return identifier
      }
    }
  }

  throw new Error("Route not found")
}

export default routes
