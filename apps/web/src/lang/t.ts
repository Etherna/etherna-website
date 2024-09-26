import type { DictionaryItem, DictionaryPlurals, DictionaryTranslations, Locale } from "./types"

interface TSingularOptions {
  locale: Locale
}

interface TPluralOptions {
  locale: Locale
  count: number
}

export function t(trans: DictionaryTranslations, options: TSingularOptions): string
export function t(plurals: DictionaryPlurals, options: TPluralOptions): string
export function t(item: DictionaryItem, options: TSingularOptions | TPluralOptions): string {
  const locale = options.locale
  if ("_zero" in item && "_one" in item && "_many" in item && "_other" in item) {
    const count = (options as TPluralOptions).count
    const fallback = item._other?.[locale] ?? "[MISSING_PLURAL_TRANSLATION]"
    if (count === 0) {
      return item._zero?.[locale] ?? fallback
    } else if (count === 1) {
      return item._one?.[locale] ?? fallback
    } else if (count > 1) {
      return item._many?.[locale] ?? fallback
    } else {
      return fallback
    }
  } else {
    return (item as DictionaryTranslations)[locale]
  }
}
