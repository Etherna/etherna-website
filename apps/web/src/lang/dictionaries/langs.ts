import type { Dictionary } from "../types"

export const langsDictionary = {
  it: {
    en: "Italiano",
    it: "Italiano",
  },
  en: {
    en: "English",
    it: "English",
  },
} as const satisfies Dictionary
