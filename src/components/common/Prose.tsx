import React from "react"
import classNames from "classnames"

import classes from "@styles/components/common/Prose.module.scss"

type ProseProps = {
  children?: React.ReactNode
  className?: string
}

const Prose: React.FC<ProseProps> = ({ children, className }) => {
  return (
    <div className={classNames(classes.prosePost, className)}>
      {children}
    </div>
  )
}

export default Prose
