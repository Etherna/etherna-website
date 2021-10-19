import { useContext } from "react"

import { LocalizedPageContext } from "@context/locale-context"

export type UseLocale = [locale: string, actions: {
  switchLocale(locale: string): void
  setLocalePath(locale: string, path?: string): void
  getLocalePath(locale: string): string | undefined
}]

/**
 * Use locale hook
 */
export default function useLocale(): UseLocale {
  const context = useContext(LocalizedPageContext)
  const [state, dispatch] = context ?? []

  const switchLocale = (locale: string) => {
    dispatch?.({
      type: "SWITCH_LOCALE",
      locale
    })
  }

  const setLocalePath = (locale: string, path?: string) => {
    dispatch?.({
      type: "SET_LOCALE_PATH",
      locale,
      path
    })
  }

  const getLocalePath = (locale: string) => (state?.pathMap || {})[locale]

  const actions = {
    switchLocale,
    getLocalePath,
    setLocalePath
  }

  return [state?.locale ?? "en", actions]
}
