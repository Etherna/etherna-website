import { defineDictionary } from ".."

export const blogDictionary = defineDictionary({
  pageTitle: {
    en: "Blog",
    it: "Blog",
  },
  pageDescription: {
    en: "Read the latest Etherna articles and updates.",
    it: "Leggi gli ultimi articoli e aggiornamenti di Etherna.",
  },
  allPosts: {
    en: "All Posts",
    it: "Tutti",
  },
  pageOf: {
    en: "Page {page} of {totalPages}",
    it: "Pagina {page} di {totalPages}",
  },
  previous: {
    en: "Previous",
    it: "Precedente",
  },
  next: {
    en: "Next",
    it: "Successivo",
  },
  plusOthers: {
    _zero: {
      en: "",
      it: "",
    },
    _one: {
      en: "+1 other",
      it: "+1 altro",
    },
    _many: {
      en: "+{count} others",
      it: "+{count} altri",
    },
  },
  minutesRead: {
    en: "{minutes} min read",
    it: "{minutes} min di lettura",
  },
})
