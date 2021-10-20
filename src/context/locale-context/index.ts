import { createContext, Reducer } from "react"

import { LocaleContext, LocaleState } from "@definitions/locale-context"

export const LocalizedPageContext = createContext<LocaleContext | undefined>(undefined)

export type LocaleContextActions = {
  type: "SWITCH_LOCALE",
  locale: string
} | {
  type: "SET_LOCALE_PATH",
  locale: string
  path?: string
}

export const reducer: Reducer<LocaleState, LocaleContextActions> = (state, action) => {
  switch (action.type) {
    case "SWITCH_LOCALE": {
      const pathMap = undefined
      const locale = action.locale
      window.localStorage.setItem("locale", locale)
      return { ...state, locale, pathMap }
    }
    case "SET_LOCALE_PATH": {
      const pathMap = state.pathMap || {}
      pathMap[action.locale] = action.path
      return { ...state, pathMap }
    }
    default: return state
  }
}
