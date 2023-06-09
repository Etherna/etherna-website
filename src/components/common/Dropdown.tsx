import React, { useRef, useState } from "react"

import { ReactComponent as ChevronDown } from "@/assets/icons/chevron-down.svg"

import DropdownContextProvider from "@/context/dropdown-context/dropdown-context-provider"
import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type DropdownProps = PropsWithChildren<{
  toggleChildren?: React.ReactNode
  toggleClass?: string
  showChevron?: boolean
}>

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
          className="fixed left-0 top-0 z-20 h-full w-full bg-transparent focus:outline-0"
          role="button"
          tabIndex={0}
          onClick={handleMenuToggle}
          onKeyDown={handleMenuToggle}
          aria-label="Close"
        />
      )}

      <button
        ref={toggleRef}
        className={classNames("whitespace-nowrap", toggleClass)}
        onClick={handleMenuToggle}
        onKeyDown={handleMenuToggle}
      >
        {toggleChildren}

        {showChevron && (
          <ChevronDown
            className={classNames(
              "ml-1 inline-block h-2 w-2 align-middle transition duration-500 hover:opacity-50",
              {
                "rotate-180 transform duration-200": showMenu,
              }
            )}
          />
        )}
      </button>

      <div
        className={classNames("fixed z-20 origin-top scale-y-0 transform transition duration-200", {
          "scale-y-100": showMenu,
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
