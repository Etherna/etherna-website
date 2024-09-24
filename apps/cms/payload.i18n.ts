import type { Locale } from "payload"

export const Locales = [
  {
    code: "en",
    label: "English",
  },
  {
    code: "it",
    label: "Italian",
  },
] as const satisfies Locale[]
