import { configLang, configLocales } from "@/utils/lang"

import type { Lang, LocaleInfo } from "@/utils/lang"

interface I18nConfigProps {
  lang: Lang
  locales: LocaleInfo[]
}

export function I18nConfig({ lang, locales }: I18nConfigProps) {
  configLang(lang).catch(console.error)
  configLocales(locales)

  return false
}
