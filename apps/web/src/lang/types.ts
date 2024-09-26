import type { LOCALES } from "./consts"

export type Locale = (typeof LOCALES)[number]

export interface LocalizedPath {
  locale: Locale
  path: string
}

export type Dictionary = {
  [key: string]: DictionaryItem
}

export type DictionaryTranslations = Record<Locale, string>

export interface DictionaryPlurals {
  _zero?: DictionaryTranslations
  _one?: DictionaryTranslations
  _many?: DictionaryTranslations
  _other?: DictionaryTranslations
}

export type DictionaryItem = DictionaryPlurals | DictionaryTranslations
