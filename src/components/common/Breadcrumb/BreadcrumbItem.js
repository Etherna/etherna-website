import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const BreadcrumbItem = ({ title, path }) => {
  return (
    <li className="breadcrumb-item">
      {path ? (
        <Link to={path}>
          {title}
        </Link>
      ) : (
        title
      )}
    </li>
  )
}

BreadcrumbItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export default BreadcrumbItem
