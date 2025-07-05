import { atom } from "nanostores"

import type { Locale } from "@/i18n/types"

export const $locale = atom<Locale | undefined>()
