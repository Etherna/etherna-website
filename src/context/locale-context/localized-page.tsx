import React, { useReducer } from "react"
import { userLocale } from "@utils/lang"

import { LocalizedPageContext, reducer } from "."
import useLocale from "./hooks/useLocale"
import { useTranslations } from "@/hooks/useTranslations"

import type { UseLocale } from "./hooks/useLocale"
import type { TransFunction } from "@/hooks/useTranslations"

type LocalizedPageFunc = (localeContext: UseLocale, t: TransFunction) => React.ReactNode

type LocalizedPageProps = {
  children: LocalizedPageFunc | React.ReactNode
  locale?: string
}

export const LocalizedPage: React.FC<LocalizedPageProps> = ({ children, locale }) => {
  const store = useReducer(reducer, {
    locale: locale || userLocale(),
  })
  return (
    <LocalizedPageContext.Provider value={store}>
      <InnerLocalizedPage>{children}</InnerLocalizedPage>
    </LocalizedPageContext.Provider>
  )
}

const InnerLocalizedPage: React.FC<{ children: LocalizedPageFunc | React.ReactNode }> = ({
  children,
}) => {
  const localeContext = useLocale()
  const [locale] = localeContext
  const { t } = useTranslations(locale)

  return <>{typeof children === "function" ? children(localeContext, t) : children}</>
}
