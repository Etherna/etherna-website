import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import { z } from "zod"

import en_about from "@/lang/en/about.json"
import en_awards from "@/lang/en/awards.json"
import en_blog from "@/lang/en/blog.json"
import en_brand from "@/lang/en/brand.json"
import en_common from "@/lang/en/common.json"
import en_contacts from "@/lang/en/contacts.json"
import en_footer from "@/lang/en/footer.json"
import en_funnel from "@/lang/en/funnel.json"
import en_header from "@/lang/en/header.json"
import en_hero from "@/lang/en/hero.json"
import en_landing from "@/lang/en/landing.json"
import en_page from "@/lang/en/page.json"
import en_project from "@/lang/en/project.json"
import en_roadmap from "@/lang/en/roadmap.json"
import en_seo from "@/lang/en/seo.json"
import it_about from "@/lang/it/about.json"
import it_awards from "@/lang/it/awards.json"
import it_blog from "@/lang/it/blog.json"
import it_brand from "@/lang/it/brand.json"
import it_common from "@/lang/it/common.json"
import it_contacts from "@/lang/it/contacts.json"
import it_footer from "@/lang/it/footer.json"
import it_funnel from "@/lang/it/funnel.json"
import it_header from "@/lang/it/header.json"
import it_hero from "@/lang/it/hero.json"
import it_landing from "@/lang/it/landing.json"
import it_page from "@/lang/it/page.json"
import it_project from "@/lang/it/project.json"
import it_roadmap from "@/lang/it/roadmap.json"
import it_seo from "@/lang/it/seo.json"

import type { AstroImg } from "@/schema/app"

export const DEFAULT_LOCALE = "en"

export const LOCALES = {
  en: "English",
  it: "Italiano",
}

export const Languages = Object.keys(LOCALES) as Lang[]

export const langSchema = z.enum(["en", "it"])

export type Lang = keyof typeof LOCALES

export type LocalizedPaths = Partial<Record<Lang, string>>

export type LocaleInfo = {
  code: string
  name: string
  flag: AstroImg
}

export const resources = {
  en: {
    about: en_about,
    awards: en_awards,
    blog: en_blog,
    brand: en_brand,
    common: en_common,
    contacts: en_contacts,
    footer: en_footer,
    funnel: en_funnel,
    header: en_header,
    hero: en_hero,
    landing: en_landing,
    page: en_page,
    project: en_project,
    roadmap: en_roadmap,
    seo: en_seo,
  },
  it: {
    about: it_about,
    awards: it_awards,
    blog: it_blog,
    brand: it_brand,
    common: it_common,
    contacts: it_contacts,
    footer: it_footer,
    funnel: it_funnel,
    header: it_header,
    hero: it_hero,
    landing: it_landing,
    page: it_page,
    project: it_project,
    roadmap: it_roadmap,
    seo: it_seo,
  },
} as const

export const configLang = (lang: string) => {
  i18n.use(initReactI18next).init({
    lng: lang,
    fallbackLng: "en",
    ns: [
      "common",
      "about",
      "awards",
      "blog",
      "brand",
      "contacts",
      "footer",
      "funnel",
      "header",
      "hero",
      "landing",
      "page",
      "project",
      "roadmap",
    ],
    resources,
  })
}

let serverLocales: LocaleInfo[] = []
export const configLocales = (locales: LocaleInfo[]) => {
  if (typeof window !== "undefined") {
    window.LOCALES = locales
  } else {
    serverLocales = locales
  }
}

export const localeInfo = (locale: Lang): LocaleInfo | null => {
  if (typeof window !== "undefined") {
    return window.LOCALES?.find(l => l.code === locale) ?? null
  }
  return serverLocales.find(l => l.code === locale) ?? null
}

export const t = i18n.t

export const userLocale = () => {
  let locale = systemLocale()

  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has("lang")) {
      locale = searchParams.get("lang")!.toLowerCase()
    } else {
      const userLocale = window.localStorage.getItem("locale")
      if (userLocale) {
        locale = userLocale.toLowerCase()
      }
    }
  }

  if (locale && locale in LOCALES) return locale
  else return DEFAULT_LOCALE
}

const systemLocale = () => {
  const navigatorLanguage =
    typeof window !== "undefined" &&
    (navigator.browserLanguage || navigator.systemLanguage || navigator.language)
  const language = navigatorLanguage || DEFAULT_LOCALE
  return language.split("-")[0]
}
