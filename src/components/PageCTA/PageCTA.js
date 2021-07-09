import React from "react"
import { Link } from "gatsby"

import "./page-cta.scss"
import routes from "@utils/routes"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

const PageCTA = () => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "page")

  return (
    <div className="page-cta">
      <div className="page-cta-content">
        <h3>{trans("becomePartOfCommunity")}</h3>

        <div className="page-cta-item">
          {trans("followTheDevelopment") + " "}
          <a
            href="https://t.me/etherna_io"
            className="social-link telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            {trans("telegramChannel")} →
          </a>
        </div>
        <div className="page-cta-item">
          {trans("helpTheDevelopment") + " "}
          <Link to={routes.homePath(locale) + "#contacts"}>{trans("findHow")} →</Link>
        </div>
      </div>
    </div>
  )
}

export default PageCTA
