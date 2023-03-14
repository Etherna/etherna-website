import fetchHomeData from "./fetch-home-data"
import fetchPageData from "./fetch-page-data"
import { t } from "@/utils/lang"
import routes, { whichRoute } from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"

type PageData = {
  data: unknown
  title: string
  description?: string
  lang: Lang
  localizedPaths: LocalizedPaths
}

export default async function fetchPage(lang: Lang, path: string): Promise<PageData> {
  const routeIdentifier = whichRoute(path, lang)

  switch (routeIdentifier) {
    case "home":
      return {
        data: await fetchHomeData(lang),
        title: "Etherna",
        description: t("seo:homeDescription", { lng: lang }),
        lang,
        localizedPaths: {
          en: routes.homePath("en"),
          it: routes.homePath("it"),
        },
      }
    case "about":
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
    case "brand-kit":
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
    case "blog":
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
    case "page":
      const pageData = await fetchPageData(lang, path)
      return {
        data: pageData,
        title: pageData.page.title,
        description: pageData.page.meta_description ?? "",
        lang,
        localizedPaths: pageData.localizedPaths,
      }

    default:
      throw new Error("Page not found. Update `/src/queries/fetch-page.ts`")
  }
}
