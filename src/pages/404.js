import React from "react"

import SEO from "@components/SEO"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <div className="bg-gray-100">
      <div className="container">
        <div className="row">
          <div className="col max-w-xl mx-auto">
            <h1>NOT FOUND</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default NotFoundPage
