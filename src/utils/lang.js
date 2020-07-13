import { useLocale } from "./localizedPage"

export const userLocale = () => {
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

  const supportedLocales = ["en", "it"]

  if (supportedLocales.indexOf(locale) >= 0) return locale
  else return supportedLocales[0]
}

const systemLocale = () => {
  const language = navigator.browserLanguage ||
    navigator.systemLanguage ||
    navigator.language ||
    "en-US"
  return language.split("-")[0]
}
