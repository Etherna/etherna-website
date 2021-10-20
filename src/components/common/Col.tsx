import React from "react"
import classNames from "classnames"

import classes from "@styles/components/common/Col.module.scss"

type ColProps = {
  as?: React.ElementType
  className?: string
}

const Col: React.FC<ColProps> = ({ children, as: As = "div", className }) => {
  return (
    <As
      className={classNames(classes.col, "w-full", className)}
    >
      {children}
    </As>
  )
}

export default Col
