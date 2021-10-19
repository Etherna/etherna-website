import React from "react"
import classNames from "classnames"

import classes from "@styles/components/layout/MegaMenu.module.scss"

import Dropdown from "@components/common/Dropdown"

type MenuProps = {
  toggleRender: React.ReactNode
  toggleClassName?: string
}

const Menu: React.FC<MenuProps> = ({ children, toggleRender, toggleClassName }) => {
  return (
    <Dropdown
      toggleClass={classNames(classes.megaMenuToggle, toggleClassName)}
      toggleChildren={toggleRender}
      showChevron={true}
    >
      <nav className={classes.megaMenu}>
        {children}
      </nav>
    </Dropdown>
  )
}

const Row: React.FC = ({ children }) => {
  return (
    <div className={classes.megaMenuRow}>
      {children}
    </div>
  )
}

const MegaMenu = {
  Menu,
  Row
}

export default MegaMenu
