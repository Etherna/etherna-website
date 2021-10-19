import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import MegaMenu from "./MegaMenu"
import MegaMenuItem from "./MegaMenuItem"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import { parsePages } from "@utils/dataParser"
import routes from "@utils/routes"

type PagesMenuProps = {
  toggleClassName?: string
}

const PagesMenu: React.FC<PagesMenuProps> = ({ toggleClassName }) => {
  const [locale] = useLocale()
  const data = useStaticQuery(graphql`
    query {
      pages: allDirectusPage {
        nodes {
          localized_contents {
            title
            slug
            locale
            excerpt
          }
        }
      }
    }
  `)
  const { t } = useTranslations(locale, "header")
  const pages = parsePages(data.pages.nodes, locale).filter(page => page.locale === locale)

  if (!pages.length) return null

  return (
    <MegaMenu.Menu toggleRender={t`explore`} toggleClassName={toggleClassName}>
      <MegaMenu.Row>
        {pages.map((page, i) => (
          <MegaMenuItem
            to={routes.pagePath(page.slug, locale)}
            title={page.title}
            excerpt={page.excerpt || undefined}
            key={i}
          />
        ))}
      </MegaMenu.Row>
    </MegaMenu.Menu>
  )
}

export default PagesMenu
