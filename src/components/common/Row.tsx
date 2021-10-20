import React from "react"
import classNames from "classnames"

import classes from "@styles/components/common/Row.module.scss"

type RowProps = {
  className?: string
  elRef?: React.RefObject<HTMLDivElement>
}

const Row: React.FC<RowProps> = ({ children, className, elRef }) => {
  return (
    <div className={classNames(classes.row, className)} ref={elRef}>
      {children}
    </div>
  )
}

export default Row
