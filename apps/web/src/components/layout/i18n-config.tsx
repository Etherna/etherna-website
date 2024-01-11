import { configLang, configLocales } from "@/utils/lang"

import type { LocaleInfo } from "@/utils/lang"

interface I18nConfigProps {
  lang: string
  locales: LocaleInfo[]
}

export function I18nConfig({ lang, locales }: I18nConfigProps) {
  configLang(lang)
  configLocales(locales)

  return false
}
