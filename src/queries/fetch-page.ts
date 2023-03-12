import { withoutLocale } from "./fetch-paths"
import { t } from "@/utils/lang"
import routes from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"

type PageData = {
  data: unknown
  title: string
  description?: string
  lang: Lang
  localizedPaths: LocalizedPaths
}

export default async function fetchPage(lang: Lang, path: string): Promise<PageData> {
  const isHome = withoutLocale(routes.homePath(lang), lang) === path
  const isAbout = withoutLocale(routes.aboutPath(lang), lang) === path
  const isBrandKit = withoutLocale(routes.brandKitPath(lang), lang) === path
  const isBlog = withoutLocale(routes.blogPath(lang), lang) === path

  if (isHome) {
    return {
      data: {},
      title: "Etherna",
      description: t("seo:homeDescription", { lng: lang }),
      lang,
      localizedPaths: {
        en: routes.homePath("en"),
        it: routes.homePath("it"),
      },
    }
  }

  if (isAbout) {
    return {
      data: {},
      title: t("seo:aboutTitle", { lng: lang }),
      description: t("seo:aboutDescription", { lng: lang }),
      lang,
      localizedPaths: {
        en: routes.aboutPath("en"),
        it: routes.aboutPath("it"),
      },
    }
  }

  if (isBrandKit) {
    return {
      data: {},
      title: t("seo:brandKitTitle", { lng: lang }),
      description: t("seo:brandKitDescription", { lng: lang }),
      lang,
      localizedPaths: {
        en: routes.brandKitPath("en"),
        it: routes.brandKitPath("it"),
      },
    }
  }

  if (isBlog) {
    return {
      data: {},
      title: t("seo:blogTitle", { lng: lang }),
      description: t("seo:blogDescription", { lng: lang }),
      lang,
      localizedPaths: {
        en: routes.blogPath("en"),
        it: routes.blogPath("it"),
      },
    }
  }

  throw new Error("Page not found. Update `/src/queries/fetch-page.ts`")
}
