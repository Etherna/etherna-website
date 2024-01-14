import { fetchBlogData } from "./fetch-blog-data"
import { fetchBrandKitData } from "./fetch-brand-kit-data"
import { fetchHomeData } from "./fetch-home-data"
import { fetchPageData } from "./fetch-page-data"
import { fetchPostData } from "./fetch-post-data"
import { fetchProjectData } from "./fetch-project-data"
import { fetchTeamData } from "./fetch-team-data"
import { t } from "@/utils/lang"
import { routes, whichRoute } from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"

interface PageData {
  data: unknown
  title: string
  description?: string
  lang: Lang
  localizedPaths: LocalizedPaths
}

export default async function fetchProps(lang: Lang, path: string): Promise<PageData> {
  const routeIdentifier = whichRoute(path, lang)

  switch (routeIdentifier) {
    case "home": {
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
    }
    case "about": {
      return {
        data: await fetchTeamData(lang),
        title: t("seo:aboutTitle", { lng: lang }),
        description: t("seo:aboutDescription", { lng: lang }),
        lang,
        localizedPaths: {
          en: routes.aboutPath("en"),
          it: routes.aboutPath("it"),
        },
      }
    }
    case "brand-kit": {
      return {
        data: await fetchBrandKitData(),
        title: t("seo:brandKitTitle", { lng: lang }),
        description: t("seo:brandKitDescription", { lng: lang }),
        lang,
        localizedPaths: {
          en: routes.brandKitPath("en"),
          it: routes.brandKitPath("it"),
        },
      }
    }
    case "blog": {
      const blogData = await fetchBlogData(lang, path)
      return {
        data: blogData,
        title: t("seo:blogTitle", { lng: lang }),
        description: t("seo:blogDescription", { lng: lang }),
        lang,
        localizedPaths: blogData.localizedPaths,
      }
    }
    case "post": {
      const postData = await fetchPostData(lang, path)
      return {
        data: postData,
        title: postData.post.title,
        description: postData.post.seo?.description ?? postData.post.excerpt ?? "",
        lang,
        localizedPaths: postData.localizedPaths,
      }
    }
    case "category": {
      const categoryData = await fetchBlogData(lang, path)
      return {
        data: categoryData,
        title: categoryData.currentCategory?.name ?? "Blog",
        description: "",
        lang,
        localizedPaths: categoryData.localizedPaths,
      }
    }
    case "page": {
      const pageData = await fetchPageData(lang, path)
      return {
        data: pageData,
        title: pageData.page.title,
        description: pageData.page.seo?.description ?? "",
        lang,
        localizedPaths: pageData.localizedPaths,
      }
    }
    case "project": {
      const projectData = await fetchProjectData(lang, path)
      return {
        data: projectData,
        title: projectData.project.title,
        description: projectData.project.seo?.description ?? "",
        lang,
        localizedPaths: projectData.localizedPaths,
      }
    }
    default:
      throw new Error("Page not found. Update `/src/queries/fetch-page.ts`")
  }
}
