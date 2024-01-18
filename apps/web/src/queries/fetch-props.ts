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
  title: string
  description?: string
  lang: Lang
  localizedPaths: LocalizedPaths
}

export type FetchedProps = Awaited<ReturnType<typeof fetchProps>>

export type ViewProps<T extends keyof FetchedProps["data"]> = PageData & {
  data: NonNullable<FetchedProps["data"][T]>
}

export async function fetchProps(lang: Lang, path: string) {
  const routeIdentifier = whichRoute(path, lang)

  switch (routeIdentifier) {
    case "home": {
      return {
        data: {
          [routeIdentifier]: await fetchHomeData(lang),
        },
        ...({
          title: "Etherna",
          description: t("seo:homeDescription", { lng: lang }),
          lang,
          localizedPaths: {
            en: routes.homePath("en"),
            it: routes.homePath("it"),
          },
        } satisfies PageData),
      }
    }
    case "about": {
      return {
        data: {
          [routeIdentifier]: await fetchTeamData(lang),
        },
        ...({
          title: t("seo:aboutTitle", { lng: lang }),
          description: t("seo:aboutDescription", { lng: lang }),
          lang,
          localizedPaths: {
            en: routes.aboutPath("en"),
            it: routes.aboutPath("it"),
          },
        } satisfies PageData),
      }
    }
    case "brand-kit": {
      return {
        data: {
          [routeIdentifier]: await fetchBrandKitData(),
        },
        ...({
          title: t("seo:brandKitTitle", { lng: lang }),
          description: t("seo:brandKitDescription", { lng: lang }),
          lang,
          localizedPaths: {
            en: routes.brandKitPath("en"),
            it: routes.brandKitPath("it"),
          },
        } satisfies PageData),
      }
    }
    case "blog": {
      const blogData = await fetchBlogData(lang, path)
      return {
        data: {
          [routeIdentifier]: blogData,
        },
        ...({
          title: t("seo:blogTitle", { lng: lang }),
          description: t("seo:blogDescription", { lng: lang }),
          lang,
          localizedPaths: blogData.localizedPaths,
        } satisfies PageData),
      }
    }
    case "post": {
      const postData = await fetchPostData(lang, path)
      return {
        data: {
          [routeIdentifier]: postData,
        },
        ...({
          title: postData.post.title,
          description: postData.post.seo?.description ?? postData.post.excerpt ?? "",
          lang,
          localizedPaths: postData.localizedPaths,
        } satisfies PageData),
      }
    }
    case "category": {
      const categoryData = await fetchBlogData(lang, path)
      return {
        data: {
          [routeIdentifier]: categoryData,
        },
        ...({
          title: categoryData.currentCategory?.name ?? "Blog",
          description: "",
          lang,
          localizedPaths: categoryData.localizedPaths,
        } satisfies PageData),
      }
    }
    case "page": {
      const pageData = await fetchPageData(lang, path)
      return {
        data: {
          [routeIdentifier]: pageData,
        },
        ...({
          title: pageData.page.title,
          description: pageData.page.seo?.description ?? "",
          lang,
          localizedPaths: pageData.localizedPaths,
        } satisfies PageData),
      }
    }
    case "project": {
      const projectData = await fetchProjectData(lang, path)
      return {
        data: {
          [routeIdentifier]: projectData,
        },
        ...({
          title: projectData.project.title,
          description: projectData.project.seo?.description ?? "",
          lang,
          localizedPaths: projectData.localizedPaths,
        } satisfies PageData),
      }
    }
    default:
      throw new Error("Page not found. Update `/src/queries/fetch-page.ts`")
  }
}
