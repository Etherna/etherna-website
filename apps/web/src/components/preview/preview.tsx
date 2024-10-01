import { Suspense } from "react"

import { Main } from "../layout/main"
import { Spinner } from "../ui/spinner"
import { Footer } from "./_footer"
import { Header } from "./_header"
import { Page } from "./_page"
import { Post } from "./_post"
import { route } from "@/lib/routes"

export function PreviewPage() {
  const pathname = window.location.pathname

  const matchPage = route.test(pathname, ["/", "/:path"])
  const matchPost = route.test(pathname, ["/blog/:slug"])

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
