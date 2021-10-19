import React from "react"
import { Link } from "gatsby"

import classes from "@styles/components/common/BreadcrumbItem.module.scss"

type BreadcrumbItemProps = {
  title: string
  path?: string
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ title, path }) => {
  const LinkWrapper: React.FC = ({ children }) => path ? (
    <Link to={path}>{children}</Link>
  ) : (
    <>{children}</>
  )

  return (
    <li className={classes.breadcrumbItem}>
      <LinkWrapper>{title}</LinkWrapper>
    </li>
  )
}

export default BreadcrumbItem