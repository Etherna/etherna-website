import React, { useEffect } from "react"
import classNames from "classnames"

import classes from "@styles/components/site/Page.module.scss"

import PageCTA from "./PageCTA"
import Markdown from "@components/common/Markdown"
import Prose from "@components/common/Prose"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Page as PageModel } from "@definitions/app"
import routes from "@utils/routes"

type PageProps = {
  page: PageModel
}

const Page: React.FC<PageProps> = ({ page }) => {
  const [, { setLocalePath }] = useLocale()

  useEffect(() => {
    setLocalePaths()
    return () => clearLocalePaths()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocalePaths = () => {
    page.allSlugs.forEach(info => {
      setLocalePath(info.locale, routes.pagePath(info.slug, info.locale))
    })
  }

  const clearLocalePaths = () => {
    page.allSlugs.forEach(info => {
      setLocalePath(info.locale, undefined)
    })
  }

  return (
    <div className="container-fluid">
      <div className={classNames(classes.pageHeaderRow, "row")}>
        <div className="col">
          <div className="container">
            <div className="row">
              <div className="col">
                <header className={classes.pageHeader}>
                  <h1 className={classes.pageHeaderTitle}>{page.title}</h1>
                  <p className={classes.pageHeaderExcerpt}>{page.excerpt}</p>
                </header>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Prose className="post-page">
            <article>
              <Markdown rawMarkdown={page.content} />
            </article>
          </Prose>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <PageCTA />
        </div>
      </div>
    </div>
  )
}

export default Page
