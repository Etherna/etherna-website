import React, { useEffect, useState } from "react"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

import classes from "@styles/components/site/FunnelThankyou.module.scss"

type FunnelThankyouProps = {}

const FunnelThankyou: React.FC<FunnelThankyouProps> = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "funnel")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const email = sessionStorage.getItem("subscriber:email")
    setEmail(email)
  }, [])

  return (
    <div className={classes.funnelThankyou}>
      <p className={classes.funnelThankyouTitle}>{t`checkInbox`}</p>
      <ul className={classes.funnelThankyouList}>
        <li dangerouslySetInnerHTML={{ __html: "⚠️ " + t`checkSpam` }} />
        <li dangerouslySetInnerHTML={{ __html: "⚠️ " + t(`checkCorrectEmail`, { email }) }} />
        <li dangerouslySetInnerHTML={{ __html: "⚠️ " + t`writeUs` }} />
      </ul>
    </div>
  )
}

export default FunnelThankyou
