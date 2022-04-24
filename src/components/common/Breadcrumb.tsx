import React from "react"

import classes from "@styles/components/common/Breadcrumb.module.scss"

type BreadcrumbProps = {
  children?: React.ReactNode
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  return (
    <ol className={classes.breadcrumb}>
      {children}
    </ol>
  )
}

export default Breadcrumb
