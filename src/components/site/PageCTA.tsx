import React from "react"
import { Link } from "gatsby"

import classes from "@styles/components/site/PageCta.module.scss"

import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import routes from "@utils/routes"

const PageCTA: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "page")

  return (
    <div className={classes.pageCta}>
      <div className={classes.pageCtaContent}>
        <h3>{t`becomePartOfCommunity`}</h3>

        <div className={classes.pageCtaItem}>
          {t`followTheDevelopment` + " "}
          <a
            href="https://t.me/etherna_io"
            className="social-link telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t`telegramChannel`} →
          </a>
        </div>
        <div className={classes.pageCtaItem}>
          {t`helpTheDevelopment` + " "}
          <Link to={routes.homePath(locale) + "#contacts"}>{t`findHow`} →</Link>
        </div>
      </div>
    </div>
  )
}

export default PageCTA
