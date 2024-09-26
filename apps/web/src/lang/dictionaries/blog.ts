import type { Dictionary } from "../types"

export const blogDictionary = {
  pageTitle: {
    en: "Blog",
    it: "Blog",
  },
  pageDescription: {
    en: "Read the latest Etherna articles and updates.",
    it: "Leggi gli ultimi articoli e aggiornamenti di Etherna.",
  },
} as const satisfies Dictionary
