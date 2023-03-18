import { configLang, configLocales } from "@/utils/lang"

import type { LocaleInfo } from "@/utils/lang"

type I18nConfigProps = {
  lang: string
  locales: LocaleInfo[]
}

export default function I18nConfig({ lang, locales }: I18nConfigProps) {
  configLang(lang)
  configLocales(locales)

  return false
}
