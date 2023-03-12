import type { Dispatch } from "react"
import type { LocaleContextActions } from "@/context/locale-context"

export type LocaleContext = [state: LocaleState, dispatch: Dispatch<LocaleContextActions>]

export interface LocaleState {
  locale: string
  pathMap?: {
    [locale: string]: string | undefined
  }
}