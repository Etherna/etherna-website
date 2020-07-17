import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const BreadcrumbItem = ({ title, path }) => {
  const LinkWrapper = ({ children }) => path ? (
    <Link to={path}>{children}</Link>
  ) : (
    <>{children}</>
  )

  return (
    <li className="breadcrumb-item">
      <LinkWrapper>{title}</LinkWrapper>
    </li>
  )
}

BreadcrumbItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
}

export default BreadcrumbItem
