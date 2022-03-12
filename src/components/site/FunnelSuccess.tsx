import React from "react"

import classes from "@styles/components/site/FunnelSuccess.module.scss"

import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

type FunnelSuccessProps = {
  message: string
}

const FunnelSuccess: React.FC<FunnelSuccessProps> = ({ message }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "funnel")

  return (
    <div className={classes.funnelSuccess}>
      {message}
    </div>
  )
}

export default FunnelSuccess
