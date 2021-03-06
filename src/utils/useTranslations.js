import Lang from "lang.js"
import { useStaticQuery, graphql } from "gatsby"

/**
 * Get the translations
 * @param {string} locale Locale (eg: "en")
 * @param {string} namespace Translation namespace, use null to get all strings (default=null)
 * @returns {Lang} Lang.js instance
 */
export const useTranslations = (locale, namespace = null) => {
  const { translations } = useStaticQuery(graphql`
    query {
      translations: allFile(filter: {sourceInstanceName: {eq: "translations"}}) {
        nodes {
          relativePath
          relativeDirectory
          name
        }
      }
    }
  `)

  let messages = {}

  translations.nodes.forEach(trans => {
    const locale = trans.relativeDirectory
    const name = trans.name
    if (namespace === null || namespace === name) {
      const keys = require(`../lang/${trans.relativePath}`)
      messages[`${locale}.${name}`] = keys
    }
  })

  const lang = new Lang({
    messages,
    locale,
    fallback: 'en'
  })

  const trans = (key, replacements, forcedLocale = null) => {
    const stringKey = `${namespace ? `${namespace}.`:``}${key}`

    let translation

    if (forcedLocale) {
      lang.setLocale(forcedLocale)
      translation = lang.get(stringKey, replacements)
      lang.setLocale(locale)
    } else {
      translation = lang.get(stringKey, replacements)
    }

    return translation
  }

  return trans
}
