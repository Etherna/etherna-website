import React from "react"
import PropTypes from "prop-types"

import "./breadcrumb.scss"

export const Breadcrumb = ({ children }) => {
  return (
    <ol className="breadcrumb">
      {children}
    </ol>
  )
}

Breadcrumb.propTypes = {
  children: PropTypes.node,
}

export default Breadcrumb
