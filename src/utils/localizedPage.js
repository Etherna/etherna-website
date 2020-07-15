import React, { createContext, useContext, useReducer } from "react"

import { userLocale } from "./lang"

const LocalizedPageContext = createContext()

/**
 * @typedef {object} LocaleState
 * @property {string} locale Current locale code
 * @property {Object.<string, string>|undefined} pathMap Locale to path map object
 *
 * @typedef {object} LocaleDispatchAction
 * @property {string} type Action type
 *
 * @param {LocaleState} state State
 * @param {LocaleDispatchAction} action Dispatch action
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_LOCALE": {
      const pathMap = undefined
      const locale = action.locale
      window.localStorage.setItem("locale", locale)
      return {...state, locale, pathMap}
    }
    case "SET_LOCALE_PATH": {
      let pathMap = state.pathMap || {}
      pathMap[action.locale] = action.path
      return {...state, pathMap}
    }
    default:
      return state
  }
}

export const LocalizedPage = ({ children }) => {
  const locale = userLocale()
  const store = useReducer(reducer, {
    locale
  })
  return (
    <LocalizedPageContext.Provider value={store}>
      {children}
    </LocalizedPageContext.Provider>
  )
}

/**
 * Use locale hook
 *
 * @typedef {string} Locale Current locale code
 *
 * @typedef {object} LocaleActions Locale actions
 * @property {(locale: string) => void} switchLocale Switch to current locale to new locale
 * @property {(locale: string) => string} getLocalePath Get the path of a locale
 * @property {(locale: string, path: string) => void} setLocalePath Set the path for a locale
 *
 * @returns {[Locale, LocaleActions]} Locale hook utilities
 */
export const useLocale = () => {
  const [state, dispatch] = useContext(LocalizedPageContext)
  const switchLocale = locale => {
    dispatch({
      type: "SWITCH_LOCALE",
      locale
    })
  }
  const setLocalePath = (locale, path) => {
    dispatch({
      type: "SET_LOCALE_PATH",
      locale,
      path
    })
  }
  const getLocalePath = locale => (state.pathMap || {})[locale]
  const actions = {
    switchLocale, getLocalePath, setLocalePath
  }

  return [state.locale, actions]
}
