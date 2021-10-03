import React, { useEffect } from "react"
import PropTypes from "prop-types"

import "./page.scss"

import PageCTA from "@components/PageCTA"
import Markdown from "@components/Markdown"
import { useLocale } from "@utils/localizedPage"
import routes from "@utils/routes"

/**
 * @typedef PageProps
 * @property {import("@utils/dataParser").Page} page
 *
 * @param {PageProps} param0
 */
const Page = ({ page }) => {
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
      <div className="row page-header-row">
        <div className="col">
          <div className="container">
            <div className="row">
              <div className="col">
                <header className="page-header">
                  <h1 className="page-header-title">{page.title}</h1>
                  <p className="page-header-excerpt">{page.excerpt}</p>
                </header>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="post post-page">
            <article className="post-content">
              <Markdown
                markdown={page.content}
                options={{
                  tables: true,
                  emoji: true,
                  strikethrough: true,
                  underline: true,
                }}
              />
            </article>
          </div>
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

Page.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
}


export default Page
