import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

type FunnelThankYouProps = {}

const FunnelThankYou: React.FC<FunnelThankYouProps> = () => {
  const { t } = useTranslation("funnel")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const email = sessionStorage.getItem("subscriber:email") ?? "..@.."
    setEmail(email)
  }, [])

  return (
    <div className="max-w-screen-md text-lg">
      <p className="text-xl font-semibold">{t("checkInbox")}</p>
      <ul className="mt-6">
        <li dangerouslySetInnerHTML={{ __html: "⚠️ " + t("checkSpam") }} />
        <li dangerouslySetInnerHTML={{ __html: "⚠️ " + t("checkCorrectEmail", { email }) }} />
        <li dangerouslySetInnerHTML={{ __html: "⚠️ " + t("writeUs") }} />
      </ul>
    </div>
  )
}

export default FunnelThankYou
