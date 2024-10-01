import { DEFAULT_LOCALE } from "./consts"

import type { Locale } from "./types"

export function localized(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) {
    return path
  }

  return `/${locale}${path}`
}
