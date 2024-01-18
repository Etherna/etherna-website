import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import { z } from "zod"

import enAbout from "@/lang/en/about.json"
import enAwards from "@/lang/en/awards.json"
import enBlog from "@/lang/en/blog.json"
import enBrand from "@/lang/en/brand.json"
import enCommon from "@/lang/en/common.json"
import enContacts from "@/lang/en/contacts.json"
import enFooter from "@/lang/en/footer.json"
import enFunnel from "@/lang/en/funnel.json"
import enHeader from "@/lang/en/header.json"
import enHero from "@/lang/en/hero.json"
import enLanding from "@/lang/en/landing.json"
import enPage from "@/lang/en/page.json"
import enProject from "@/lang/en/project.json"
import enRoadmap from "@/lang/en/roadmap.json"
import enSeo from "@/lang/en/seo.json"
import itAbout from "@/lang/it/about.json"
import itAwards from "@/lang/it/awards.json"
import itBlog from "@/lang/it/blog.json"
import itBrand from "@/lang/it/brand.json"
import itCommon from "@/lang/it/common.json"
import itContacts from "@/lang/it/contacts.json"
import itFooter from "@/lang/it/footer.json"
import itFunnel from "@/lang/it/funnel.json"
import itHeader from "@/lang/it/header.json"
import itHero from "@/lang/it/hero.json"
import itLanding from "@/lang/it/landing.json"
import itPage from "@/lang/it/page.json"
import itProject from "@/lang/it/project.json"
import itRoadmap from "@/lang/it/roadmap.json"
import itSeo from "@/lang/it/seo.json"

export const DEFAULT_LOCALE = "en"

export const LOCALES = {
  en: "English",
  it: "Italiano",
}

export const Languages = Object.keys(LOCALES) as Lang[]

export const langSchema = z.enum(["en", "it"])

export type Lang = keyof typeof LOCALES

export type LocalizedPaths = Partial<Record<Lang, string>>

export interface LocaleInfo {
  code: Lang
  name: string
  icon: {
    svg: string | null
  }
}

export const resources = {
  en: {
    about: enAbout,
    awards: enAwards,
    blog: enBlog,
    brand: enBrand,
    common: enCommon,
    contacts: enContacts,
    footer: enFooter,
    funnel: enFunnel,
    header: enHeader,
    hero: enHero,
    landing: enLanding,
    page: enPage,
    project: enProject,
    roadmap: enRoadmap,
    seo: enSeo,
  },
  it: {
    about: itAbout,
    awards: itAwards,
    blog: itBlog,
    brand: itBrand,
    common: itCommon,
    contacts: itContacts,
    footer: itFooter,
    funnel: itFunnel,
    header: itHeader,
    hero: itHero,
    landing: itLanding,
    page: itPage,
    project: itProject,
    roadmap: itRoadmap,
    seo: itSeo,
  },
} as const

export const configLang = async (lang: string) => {
  await i18n.use(initReactI18next).init({
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
    locale = (searchParams.get("lang") ?? window.localStorage.getItem("locale"))?.toLowerCase()
  }

  if (locale && locale in LOCALES) return locale

  return DEFAULT_LOCALE
}

const systemLocale = () => {
  const navigatorLanguage =
    typeof window !== "undefined" &&
    (navigator.browserLanguage || navigator.systemLanguage || navigator.language)
  const language = navigatorLanguage || DEFAULT_LOCALE
  return language.split("-")[0]
}
