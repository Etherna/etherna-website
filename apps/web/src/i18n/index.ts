import { createDictionary } from "dictionary-fn"

import { LOCALES } from "./consts"

const { defineDictionary, t } = createDictionary({
  locales: LOCALES,
})

export { defineDictionary, t }
