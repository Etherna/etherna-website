import React, { useReducer } from "react"

import { LocalizedPageContext, reducer } from "."
import useLocale, { UseLocale } from "./hooks/useLocale"
import { userLocale } from "@utils/lang"
import { TransFunction, useTranslations } from "@hooks/useTranslations"

type LocalizedPageFunc = (localeContext: UseLocale, t: TransFunction) => React.ReactNode

type LocalizedPageProps = {
  locale?: string
  children: LocalizedPageFunc | React.ReactNode
}

export const LocalizedPage: React.FC<LocalizedPageProps> = ({ children, locale }) => {
  const store = useReducer(reducer, {
    locale: locale || userLocale()
  })
  return (
    <LocalizedPageContext.Provider value={store}>
      <InnerLocalizedPage>
        {children}
      </InnerLocalizedPage>
    </LocalizedPageContext.Provider>
  )
}

const InnerLocalizedPage: React.FC = ({ children }) => {
  const localeContext = useLocale()
  const [locale] = localeContext
  const { t } = useTranslations(locale)

  return (
    typeof children === "function" ? (
      children(localeContext, t)
    ) : (
      children
    )
  )
}

