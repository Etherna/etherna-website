import { useEffect } from "react"

type UrlRedirectProps = {}

const UrlRedirect: React.FC<UrlRedirectProps> = ({}) => {
  useEffect(() => {
    if (import.meta.env.NODE_ENV !== "production") return
    if (typeof window === "undefined" || typeof URL === "undefined") return

    // auto redirect www to non-www && http to https

    const url = new URL(window.location.href)
    let redirect = false

    if (url.protocol === "http:") {
      url.protocol = "https:"
      redirect = true
    }

    if (window.location.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4)
      redirect = true
    }

    if (redirect) {
      window.location.href = url.href
    }
  }, [])

  return null
}

export default UrlRedirect
