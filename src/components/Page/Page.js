import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Markdown } from "react-showdown"

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
    <div className="container py-8">
      <div className="row">
        <div className="col">
          <div className="post post-page">
            <article className="post-content">
              <h1>{page.title}</h1>
              <Markdown markdown={page.content} />
            </article>
          </div>
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
