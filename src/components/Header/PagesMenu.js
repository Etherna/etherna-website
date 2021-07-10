import React from "react"
import classnames from "classnames"
import { Link, useStaticQuery, graphql } from "gatsby"

import DropDown from "@components/common/DropDown"
import { useLocale } from "@utils/localizedPage"
import routes from "@utils/routes"
import { parsePages } from "@utils/dataParser"
import { useTranslations } from "@utils/useTranslations"

const PagesMenu = () => {
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
  const trans = useTranslations(locale, "header")
  const pages = parsePages(data.pages.nodes, locale).filter(page => page.locale === locale)

  if (!pages.length) return null

  return (
    <DropDown
      toggleClass={classnames(
        "header-link",
        "mega-toggle"
      )}
      toggleChildren={trans("explore")}
      showChevron={true}
    >
      <nav className="mega-menu">
        <div className="mega-menu-row">
          {pages.map((page, i) => (
            <PageMenuItem
              page={page}
              locale={locale}
              key={i}
            />
          ))}
        </div>
      </nav>
    </DropDown>
  )
}

const PageMenuItem = ({ page, locale }) => {
  const path = routes.pagePath(page.slug, locale)

  const LinkWrapper = ({ children }) => path ? (
    <Link to={path}>{children}</Link>
  ) : (
    <>{children}</>
  )

  return (
    <div className={classnames("mega-menu-item")}>
      <div className="mega-menu-item-info">
        <LinkWrapper>
          <div className="mega-title">{page.title}</div>
          <p className="mega-description">{page.excerpt}</p>
        </LinkWrapper>
      </div>
    </div>
  )
}

export default PagesMenu
