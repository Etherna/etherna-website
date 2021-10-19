import React, { useState, useRef, Fragment } from "react"
import { Popover } from "@headlessui/react"
import classNames from "classnames"

import classes from "@styles/components/common/Dropdown.module.scss"

type DropdownProps = {
  toggleChildren?: React.ReactNode
  toggleClass?: string
  showChevron?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  toggleChildren,
  toggleClass,
  showChevron
}) => {
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({})

  const handleMenuToggle = (open: boolean) => {
    if (open && toggleRef.current && menuRef.current) {
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
  }

  return (
    <Popover as={Fragment}>
      {({ open }) => (
        <>
          {open && (
            <Popover.Overlay
              as="div"
              className={classes.dropdownBackdrop}
              aria-label="Close"
              onClick={() => handleMenuToggle(!open)}
              onKeyDown={() => handleMenuToggle(!open)}
            />
          )}

          <Popover.Button
            ref={toggleRef}
            className={classNames(
              classes.dropdownToggle,
              toggleClass,
              {
                [classes.dropdownToggleChevron]: showChevron,
                [classes.active]: open,
              }
            )}
            onClick={() => handleMenuToggle(!open)}
            onKeyDown={() => handleMenuToggle(!open)}
          >
            {toggleChildren}
          </Popover.Button>

          <Popover.Panel
            className={classNames(classes.dropdownMenu, {
              [classes.active]: open
            })}
            style={{ ...position }}
            ref={menuRef}
          >
            {children}
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}

export default Dropdown
