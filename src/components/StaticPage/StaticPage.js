import React from "react"
import PropTypes from "prop-types"

import "./static-page.scss"

const StaticPage = ({ title, children }) => {
  return (
    <div className="static-page">
      <div className="container">
        <div className="row">
          {title && (
            <div className="col w-full">
              <h1>{title}</h1>
            </div>
          )}
          <div className="col w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

StaticPage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
}

export default StaticPage
