const DEFAULT_LOCALE = "en"

const SUPPORTED_LOCALES = ["it", "en"]

const userLocale = () => {
  let locale = systemLocale()

  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has("lang")) {
      locale = searchParams.get("lang").toLowerCase()
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

const systemLocale = () => {
  const navigatorLanguage = typeof window !== "undefined" && (
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    navigator.language
  )
  const language = navigatorLanguage || DEFAULT_LOCALE
  return language.split("-")[0]
}

exports.DEFAULT_LOCALE = DEFAULT_LOCALE
exports.SUPPORTED_LOCALES = SUPPORTED_LOCALES
exports.userLocale = userLocale
