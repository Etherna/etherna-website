const DEFAULT_LOCALE = "en"

const SUPPORTED_LOCALES = ["it", "en"]

const systemLocale = () => {
  const language = navigator.browserLanguage ||
    navigator.systemLanguage ||
    navigator.language ||
    "en-US"
  return language.split("-")[0]
}

const userLocale = () => {
  let locale = systemLocale()

  if (typeof window !== undefined) {
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

exports.DEFAULT_LOCALE = DEFAULT_LOCALE
exports.SUPPORTED_LOCALES = SUPPORTED_LOCALES
exports.systemLocale = systemLocale
exports.userLocale = userLocale
