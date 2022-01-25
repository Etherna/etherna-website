export const DEFAULT_LOCALE = "en"

export const SUPPORTED_LOCALES = ["it", "en"]

export const userLocale = () => {
  let locale = systemLocale()

  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has("lang")) {
      locale = searchParams.get("lang")!.toLowerCase()
    } else {
      const userLocale = window.localStorage.getItem("locale")
      if (userLocale) {
        locale = userLocale.toLowerCase()
      }
    }
  }

  if (SUPPORTED_LOCALES.indexOf(locale) >= 0) return locale
  else return DEFAULT_LOCALE
}

export const systemLocale = () => {
  const navigatorLanguage = typeof window !== "undefined" && (
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    navigator.language
  )
  const language = navigatorLanguage || DEFAULT_LOCALE
  return language.split("-")[0]
}
