import type { LOCALES } from "./consts"

export type Locale = (typeof LOCALES)[number]

export interface LocalizedPath {
  locale: Locale
  path: string
}
