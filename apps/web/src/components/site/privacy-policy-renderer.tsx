import { useEffect } from "react"

export function PrivacyPolicyRenderer() {
  useEffect(() => {
    const iubendaScript = document.createElement("script")
    iubendaScript.src = "https://cdn.iubenda.com/iubenda.js"

    const tag = document.getElementsByTagName("script")[0]

    if (tag?.parentNode) {
      tag.parentNode.insertBefore(iubendaScript, tag)
    }

    return () => {
      iubendaScript.remove()
    }
  }, [])

  return (
    <a
      href="https://www.iubenda.com/privacy-policy/57423156"
      className="iubenda-white no-brand iubenda-embed iub-body-embed"
      title="Privacy Policy"
    >
      Privacy Policy
    </a>
  )
}
