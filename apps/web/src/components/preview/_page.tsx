import { Suspense, use } from "react"

import { HeroBlock } from "../blocks/hero-block"
import { Main } from "../layout/main"
import { Blocks } from "./_blocks"
import { Footer } from "./_footer"
import { Header } from "./_header"
import { fetchFooter } from "@/queries/fetch-footer"
import { fetchHeader } from "@/queries/fetch-header"
import { fetchPage } from "@/queries/fetch-page"

import type { Locale } from "@/i18n/types"

interface PageProps {
  path: string
  locale: Locale
  accessToken: string
  fetchPagePromise: ReturnType<typeof fetchPage>
}

export function Page({ path, locale, accessToken, fetchPagePromise }: PageProps) {
  const { page, localizedPaths } = use(fetchPagePromise)

  return (
    <>
      <Suspense>
        <Header
          locale={locale}
          path={path}
          localizedPaths={localizedPaths}
          fetchHeaderPromise={fetchHeader({
            locale,
            accessToken,
          })}
        />
      </Suspense>
      <Main>
        <HeroBlock {...page.hero} />
        <Blocks blocks={page.layout} locale={locale} />
      </Main>
      <Suspense>
        <Footer
          locale={locale}
          localizedPaths={localizedPaths}
          fetchFooterPromise={fetchFooter({
            locale,
            accessToken,
          })}
        />
      </Suspense>
    </>
  )
}
