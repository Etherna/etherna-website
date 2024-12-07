import { Suspense } from "react"

import { Spinner } from "../ui/spinner"
import { Page } from "./_page"
import { Post } from "./_post"
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/consts"
import { route } from "@/lib/routes"
import { fetchPage } from "@/queries/fetch-page"
import { fetchPost } from "@/queries/fetch-post"

import type { Locale } from "@/i18n/types"

export function PreviewPage() {
  const searchParams = new URLSearchParams(window.location.search)

  const localeValue = searchParams.get("lang") as Locale
  const locale = LOCALES.includes(localeValue) ? localeValue : DEFAULT_LOCALE
  const id = searchParams.get("id")
  const path = searchParams.get("path")
  const accessToken = searchParams.get("accessToken") ?? ""

  if (!id || !path) {
    return (
      <p>
        Missing <pre>id</pre> or <pre>path</pre>.
      </p>
    )
  }

  const matchPage = route.test(path, ["/", "/:path"])
  const matchPost = route.test(path, ["/blog/:slug"])

  return (
    <>
      {matchPage && (
        <Suspense fallback={<Spinner className="absolute-center" size={32} />}>
          <Page
            locale={locale}
            path={path}
            accessToken={accessToken}
            fetchPagePromise={fetchPage({
              id,
              locale,
              accessToken,
            })}
          />
        </Suspense>
      )}

      {matchPost && (
        <Suspense fallback={<Spinner className="absolute-center" size={32} />}>
          <Post
            locale={locale}
            path={path}
            accessToken={accessToken}
            fetchPostPromise={fetchPost({
              id,
              locale,
              accessToken,
            })}
          />
        </Suspense>
      )}
    </>
  )
}
