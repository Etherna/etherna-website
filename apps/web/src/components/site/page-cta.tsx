import { useTranslation } from "react-i18next"

import { routes } from "@/utils/routes"

import type { Lang } from "@/utils/lang"

interface PageCTAProps {
  lang: Lang
}

export function PageCTA({ lang }: PageCTAProps) {
  const { t } = useTranslation("page")

  return (
    <div className="mx-auto mb-8 max-w-prose rounded-lg bg-white p-4 shadow-xl md:mb-16 md:p-8 lg:text-lg">
      <div className="space-y-3 lg:text-base">
        <h3>{t("becomePartOfCommunity")}</h3>

        <div className="text-gray-600">
          {`${t("followTheDevelopment")} `}
          <a
            href="https://t.me/etherna_io"
            className="social-link telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("telegramChannel")} →
          </a>
        </div>
        <div className="text-gray-600">
          {`${t("helpTheDevelopment")} `}
          <a href={`${routes.homePath(lang)}#contacts`}>{t("findHow")} →</a>
        </div>
      </div>
    </div>
  )
}
