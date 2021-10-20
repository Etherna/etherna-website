import { useStaticQuery, graphql } from "gatsby"

import { SvgNode } from "@definitions/sources"

export type LocaleInfo = {
  code: string
  name: string
  flag: SvgNode
}

type LocaleInfoStaticQuery = {
  locales: {
    nodes: LocaleInfo[]
  }
}

/**
 * Get locales info
 */
const useLocaleInfo = () => {
  const data = useStaticQuery<LocaleInfoStaticQuery>(graphql`
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

  const localeInfo = (locale: string) =>
    locales.find(l => l.code === locale)!

  return [
    localeInfo,
    locales
  ] as const
}

export default useLocaleInfo
