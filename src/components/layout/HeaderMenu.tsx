import React from "react"
import classNames from "classnames"

import classes from "@styles/components/layout/HeaderMenu.module.scss"

type HeaderMenuProps = {
  children?: React.ReactNode
  className?: string
  position?: "left" | "right"
  landingMenu?: boolean
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  children,
  className,
  position,
  landingMenu
}) => {
  return (
    <nav className={classNames(classes.headerMenu, className, {
      [classes.menuLanding]: landingMenu,
      [classes.menuLeft]: position === "left",
      [classes.menuRight]: position === "right",
    })}>
      {children}
    </nav>
  )
}

export default HeaderMenu
