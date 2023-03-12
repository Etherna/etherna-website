import React, { useState, useRef } from "react"

import classes from "@/styles/components/common/Dropdown.module.scss"

import DropdownContextProvider from "@/context/dropdown-context/dropdown-context-provider"
import classNames from "@/utils/classnames"

type DropdownProps = {
  children?: React.ReactNode
  toggleChildren?: React.ReactNode
  toggleClass?: string
  showChevron?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  toggleChildren,
  toggleClass,
  showChevron,
}) => {
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [position, setPosition] = useState({})

  const handleMenuToggle = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && !["Esc", "Enter"].includes(e.key)) {
      return
    }

    const show = !showMenu

    if (show && toggleRef.current && menuRef.current) {
      const toggleBounds = toggleRef.current.getBoundingClientRect()
      const menuBounds = menuRef.current.getBoundingClientRect()
      const clientWidth = document.documentElement.clientWidth
      const rightMargin = 20

      const toggleCenter = toggleBounds.x + toggleBounds.width / 2

      let left = toggleCenter - menuBounds.width / 2
      if (left + menuBounds.width + rightMargin > clientWidth) {
        left = clientWidth - menuBounds.width - rightMargin
      }
      if (left < 0) {
        left = 0
      }

      setPosition({
        top: `${toggleBounds.bottom}px`,
        left: `${left}px`,
      })
    }

    setShowMenu(show)
  }

  return (
    <>
      {showMenu && (
        <div
          className={classes.dropdownBackdrop}
          role="button"
          tabIndex={0}
          onClick={handleMenuToggle}
          onKeyDown={handleMenuToggle}
          aria-label="Close"
        />
      )}

      <button
        ref={toggleRef}
        className={classNames(classes.dropdownToggle, toggleClass, {
          [classes.dropdownToggleChevron]: showChevron,
          [classes.active]: showMenu,
        })}
        onClick={handleMenuToggle}
        onKeyDown={handleMenuToggle}
      >
        {toggleChildren}
      </button>

      <div
        className={classNames(classes.dropdownMenu, {
          [classes.active]: showMenu,
        })}
        style={{ ...position }}
        ref={menuRef}
      >
        <DropdownContextProvider showMenu={showMenu} setShowMenu={setShowMenu}>
          {children}
        </DropdownContextProvider>
      </div>
    </>
  )
}

export default Dropdown
