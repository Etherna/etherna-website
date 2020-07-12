export const systemLocale = () => {
  const language = navigator.browserLanguage ||
    navigator.systemLanguage ||
    navigator.language ||
    "en-US"
  return language.split("-")[0]
}