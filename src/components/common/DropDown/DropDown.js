import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import { DropdownContextProvider } from "./dropdownContext"

import "./dropdown.scss"

const DropDown = ({
  children,
  toggleChildren,
  toggleClass,
  showChevron
}) => {
  const toggleRef = useRef()
  const menuRef = useRef()
  const [showMenu, setShowMenu] = useState(false)
  const [position, setPosition] = useState({})

  const handleMenuToggle = e => {
    const key = e && e.key
    if (key && (key !== 27 || key !== 32)) {
      // Trigger only with ESC - SPACE
      return
    }

    const show = !showMenu

    if (show) {
      const toggleBounds = toggleRef.current.getBoundingClientRect()
      const menuBounds = menuRef.current.getBoundingClientRect()
      const clientWidth = document.documentElement.clientWidth
      const rightMargin = 20

      const toggleCenter = toggleBounds.x + (toggleBounds.width / 2)

      let left = toggleCenter - (menuBounds.width / 2)
      if (left + menuBounds.width + rightMargin > clientWidth) {
        left = clientWidth - menuBounds.width - rightMargin
      }
      if (left < 0) {
        left = 0
      }

      setPosition({
        top: `${toggleBounds.bottom}px`,
        left: `${left}px`
      })
    }

    setShowMenu(show)
  }

  return (
    <>
      {showMenu && (
        <div
          className="dropdown-backdrop"
          role="button"
          tabIndex="0"
          onClick={handleMenuToggle}
          onKeyDown={handleMenuToggle}
          aria-label="Close"
        ></div>
      )}

      <button
        ref={toggleRef}
        className={classnames(
          "dropdown-toggle",
          toggleClass, {
            "dropdown-toggle-chevron": showChevron,
            "active": showMenu,
          }
        )}
        onClick={handleMenuToggle}
        onKeyDown={handleMenuToggle}
      >
        {toggleChildren}
      </button>

      <div
        className={classnames("dropdown-menu", {
          "active": showMenu
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

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  toggleChildren: PropTypes.node,
  toggleClass: PropTypes.string,
  showChevron: PropTypes.bool,
}

DropDown.defaultProps = {
  showChevron: false
}

export default DropDown
