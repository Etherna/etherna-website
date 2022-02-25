import React from "react"

import classes from "@styles/components/site/FunnelThankyou.module.scss"

import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

type FunnelThankyouProps = {
  email?: string | null
}

const FunnelThankyou: React.FC<FunnelThankyouProps> = ({ email }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "funnel")

  return (
    <div className={classes.funnelThankyou}>
      <p className={classes.funnelThankyouTitle}>{t`checkInbox`}</p>
      <ul className={classes.funnelThankyouList}>
        <li dangerouslySetInnerHTML={{ __html: "⚠️ " + t`checkSpam` }} />
        <li dangerouslySetInnerHTML={{ __html: "⚠️ " + t(`checkCorrectEmail`, { email: email || "" }) }} />
        <li dangerouslySetInnerHTML={{ __html: "⚠️ " + t`writeUs` }} />
      </ul>
    </div>
  )
}

export default FunnelThankyou
