import type { Dictionary } from "../types"

export const formDictionary = {
  required: {
    en: "This field is required",
    it: "Questo campo è obbligatorio",
  },
  email: {
    en: "Invalid email address",
    it: "Indirizzo email non valido",
  },
  number: {
    en: "This field must be a valid number",
    it: "Questo campo deve essere un numero valido",
  },
} as const satisfies Dictionary
