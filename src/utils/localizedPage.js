import React, { createContext, useContext, useReducer } from "react"

import { userLocale } from "./lang"

const LocalizedPageContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_LOCALE":
      const locale = action.locale
      window.localStorage.setItem("locale", locale)
      return {...state, locale}
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

export const useLocale = () => {
  const [state, dispatch] = useContext(LocalizedPageContext)
  const switchLocale = locale => {
    dispatch({
      type: "SWITCH_LOCALE",
      locale
    })
  }
  return [state.locale, switchLocale]
}
