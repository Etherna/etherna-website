import { Suspense } from "react"

import { Main } from "../layout/main"
import { Spinner } from "../ui/spinner"
import { Footer } from "./_footer"
import { Header } from "./_header"
import { Page } from "./_page"
import { Post } from "./_post"
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/consts"
import { route } from "@/lib/routes"

import type { Locale } from "@/i18n/types"

export function PreviewPage() {
  const pathname = window.location.pathname
  const searchParams = new URLSearchParams(window.location.search)

  const matchPage = route.test(pathname, ["/", "/:path"])
  const matchPost = route.test(pathname, ["/blog/:slug"])

  const localeValue = searchParams.get("locale") as Locale
  const locale = LOCALES.includes(localeValue) ? localeValue : DEFAULT_LOCALE

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <Main>
        <Suspense fallback={<Spinner size={32} />}>
          {matchPage && <Page />}
          {matchPost && <Post />}
        </Suspense>
      </Main>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  )
}
