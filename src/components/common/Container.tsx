import React from "react"
import classNames from "classnames"

import classes from "@styles/components/common/Container.module.scss"

type ContainerProps = {
  children?: React.ReactNode
  className?: string
  fluid?: boolean
}

const Container: React.FC<ContainerProps> = ({ children, fluid, className }) => {
  return (
    <div
      className={classNames({
        [classes.container]: !fluid,
        [classes.containerFluid]: fluid
      }, className)
      }>
      {children}
    </div>
  )
}

export default Container
