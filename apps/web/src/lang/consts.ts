import { Locales } from "@payload-config"

export const LOCALES = Locales.map((locale) => locale.code) as ArrayToTuple<
  (typeof Locales)[number]["code"][]
>
export const DEFAULT_LOCALE = Locales[0].code
export const OTHER_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE)
