import { useTranslation } from "react-i18next"

import classes from "@/styles/components/site/PageCta.module.scss"

import routes from "@/utils/routes"

import type { Lang } from "@/utils/lang"

type PageCTAProps = {
  lang: Lang
}

const PageCTA: React.FC<PageCTAProps> = ({ lang }) => {
  const { t } = useTranslation("page")

  return (
    <div className={classes.pageCta}>
      <div className={classes.pageCtaContent}>
        <h3>{t("becomePartOfCommunity")}</h3>

        <div className={classes.pageCtaItem}>
          {t("followTheDevelopment") + " "}
          <a
            href="https://t.me/etherna_io"
            className="social-link telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("telegramChannel")} →
          </a>
        </div>
        <div className={classes.pageCtaItem}>
          {t("helpTheDevelopment") + " "}
          <a href={routes.homePath(lang) + "#contacts"}>{t("findHow")} →</a>
        </div>
      </div>
    </div>
  )
}

export default PageCTA
