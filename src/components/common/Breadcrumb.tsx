import React from "react"

import classes from "@styles/components/common/Breadcrumb.module.scss"

export const Breadcrumb: React.FC = ({ children }) => {
  return (
    <ol className={classes.breadcrumb}>
      {children}
    </ol>
  )
}

export default Breadcrumb
