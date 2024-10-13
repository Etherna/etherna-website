import type { Dictionary } from "../types"

export const milestonesDictionary = {
  completed: {
    en: "Completed",
    it: "Completato",
  },
  active: {
    en: "Active",
    it: "In corso",
  },
  upcoming: {
    en: "Upcoming",
    it: "Prossimamente",
  },
} as const satisfies Dictionary
