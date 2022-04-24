import React from "react"
import classNames from "classnames"

import classes from "@styles/components/common/Card.module.scss"

type CardProps = {
  children?: React.ReactNode
  className?: string
  size?: "large"
}

const Card: React.FC<CardProps> = ({ children, className, size }) => {
  return (
    <div className={classNames(classes.card, className, {
      [classes.cardLg]: size === "large"
    })}>
      {children}
    </div>
  )
}

export default Card
