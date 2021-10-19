import Lang, { Replacements } from "lang.js"
import { useStaticQuery, graphql } from "gatsby"

type TranslationsStaticQuery = {
  translations: {
    nodes: Array<{
      relativePath: string
      relativeDirectory: string
      name: string
      internal: {
        content: string
      }
    }>
  }
}

type TranslationsMessages = {
  [msg: string]: Record<string, string>
}

export type TransFunction = (
  key: TemplateStringsArray | string,
  replacements?: Replacements,
  forcedLocale?: string
) => string

/**
 * Get the translations
 *
 * @param locale Locale (eg: "en")
 * @param namespace Translation namespace, use null to get all strings (default=null)
 * @returns Lang.js instance
 */
export const useTranslations = (locale: string, namespace?: string) => {
  const { translations } = useStaticQuery<TranslationsStaticQuery>(graphql`
    query {
      translations: allFile(filter: {sourceInstanceName: {eq: "translations"}}) {
        nodes {
          relativePath
          relativeDirectory
          name
          internal {
            content
          }
        }
      }
    }
  `)

  const messages: TranslationsMessages = {}

  translations.nodes.forEach(trans => {
    const locale = trans.relativeDirectory
    const name = trans.name
    if (namespace === null || namespace === name) {
      const keys = JSON.parse(trans.internal.content)
      messages[`${locale}.${name}`] = keys
    }
  })

  const lang = new Lang({
    messages,
    locale,
    fallback: "en"
  })

  const trans: TransFunction = (
    key: TemplateStringsArray | string,
    replacements?: Replacements,
    forcedLocale?: string
  ) => {
    const stringKey = `${namespace ? `${namespace}.` : ``}${key}`

    let translation: string

    if (forcedLocale) {
      lang.setLocale(forcedLocale)
      translation = lang.get(stringKey, replacements)
      lang.setLocale(locale)
    } else {
      translation = lang.get(stringKey, replacements)
    }

    return translation
  }

  return {
    t: trans,
    lang
  }
}
