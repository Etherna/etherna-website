import type { LOCALES } from "./consts"

export type Locale = (typeof LOCALES)[number]

export type LocalizedPath = {
  locale: Locale
  path: string
}
