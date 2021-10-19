import React from "react"
import { Link } from "gatsby"

import HeadMeta from "@components/layout/HeadMeta"
import { userLocale } from "@utils/lang"
import routes from "@utils/routes"

const NotFoundPage = () => {
  const locale = userLocale()

  return (
    <>
      <HeadMeta title="404: Not found" />

      <div className="bg-gray-200 h-screen">
        <div className="container py-8 text-gray-700">
          <div className="row">
            <div className="col">
              <Link
                to={routes.homePath(locale)}
              >
                ← Back to Etherna
              </Link>
            </div>
          </div>
          <div className="row text-center py-24">
            <div className="col max-w-xl mx-auto">
              <h2 style={{ fontSize: `8rem` }}>404</h2>
              <h1 className="text-gray-700">NOT FOUND</h1>
              <p className="text-gray-500">You just hit a route that doesn&#39;t exist... the sadness.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
