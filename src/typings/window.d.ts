import type { LocaleInfo } from "@/utils/lang"

declare global {
  interface Window {
    LOCALES?: LocaleInfo[]
    webkitRequestAnimationFrame?: typeof window.requestAnimationFrame
    mozRequestAnimationFrame?: typeof window.requestAnimationFrame
    msRequestAnimationFrame?: typeof window.requestAnimationFrame
  }
  interface Navigator {
    browserLanguage?: string
    systemLanguage?: string
  }
}

export {}
