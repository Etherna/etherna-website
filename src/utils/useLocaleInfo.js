import { useStaticQuery, graphql } from "gatsby"

/**
 * @typedef {object} SvgNode
 * @property {object} localFile
 * @property {string} localFile.publicURL
 *
 * @typedef {object} LocaleInfo
 * @property {string} code
 * @property {string} name
 * @property {SvgNode} flag
 */

/**
 * Get locales info
 *
 * @returns {[(locale: string) => LocaleInfo, LocaleInfo[]]}
 */
const useLocaleInfo = () => {
  const data = useStaticQuery(graphql`
    query {
      locales: allDirectusLocale {
        nodes {
          name
          code
          flag {
            localFile {
              publicURL
            }
          }
        }
      }
    }
  `)

  const locales = data.locales.nodes

  const localeInfo = locale =>
    locales.find(l => l.code === locale)

  return [
    localeInfo,
    locales
  ]
}

export default useLocaleInfo
