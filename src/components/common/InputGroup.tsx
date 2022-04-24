import React from "react"
import classNames from "classnames"

import classes from "@styles/components/common/InputGroup.module.scss"

type InputGroupProps = {
  children?: React.ReactNode
  className?: string
}

const InputGroup: React.FC<InputGroupProps> = ({ children, className }) => {
  return (
    <div className={classNames(classes.inputGroup, className)}>
      {children}
    </div>
  )
}

export default InputGroup
