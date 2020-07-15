import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Link } from "gatsby"

import useLocaleInfo from "@utils/useLocaleInfo"
import { useLocale } from "@utils/localizedPage"

import "./lang-switcher.scss"

const LangSwitcher = ({ className }) => {
  const [localeInfo, locales] = useLocaleInfo()
  const [showMenu, setShowMenu] = useState(false)
  const [position, setPosition] = useState({})
  const [
    locale, {
      switchLocale,
      getLocalePath
    }
  ] = useLocale()
  const currentLocaleFlag = localeInfo(locale).flag.localFile.publicURL
  const toggleRef = useRef()
  const menuRef = useRef()

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

      let left = toggleBounds.x + (toggleBounds.width / 2) - (menuBounds.width / 2)
      if (left + menuBounds.width + rightMargin > clientWidth) {
        left = clientWidth - menuBounds.width - rightMargin
      }

      setPosition({
        top: `${toggleBounds.bottom}px`,
        left: `${left}px`
      })
    }

    setShowMenu(show)
  }

  const handleSwitchLocale = (locale, e) => {
    const key = e && e.key
    if (key && (key !== 13)) {
      // Trigger only with ENTER
      return
    }

    switchLocale(locale)
    setShowMenu(false)
  }

  return (
    <>
      {showMenu && (
        <div
          className="lang-switcher-backdrop"
          role="button"
          tabIndex="0"
          onClick={handleMenuToggle}
          onKeyDown={handleMenuToggle}
          aria-label="Close"
        ></div>
      )}

      <button
        ref={toggleRef}
        className={classnames("lang-menu-toggle", className)}
        onClick={handleMenuToggle}
        onKeyDown={handleMenuToggle}
        aria-label="Change language"
      >
        <div className="lang-image">
          <img src={currentLocaleFlag} alt="" />
        </div>
      </button>

      <nav
        className="lang-switcher-menu"
        style={{
          ...position,
          visibility: showMenu ? "" : "hidden",
          pointerEvents: showMenu ? "" : "none"
        }}
        ref={menuRef}
      >
        {locales.map((loc, i) => {
          const { code, name, flag } = loc
          const localePath = getLocalePath(code)
          return localePath ? (
            <Link
              className={classnames("lang-switcher-menu-item", {
                "active": code === locale
              })}
              to={localePath}
              aria-label={`Switch to ${name}`}
              key={i}
            >
              <div className="lang-image">
                <img src={flag.localFile.publicURL} alt={name} />
              </div>
              <span>{name}</span>
            </Link>
          ) : (
            <div
              className={classnames("lang-switcher-menu-item", {
                "active": code === locale
              })}
              role="button"
              tabIndex="0"
              onClick={e => handleSwitchLocale(code, e)}
              onKeyDown={e => handleSwitchLocale(code, e)}
              aria-label={`Switch to ${name}`}
              key={i}
            >
              <div className="lang-image">
                <img src={flag.localFile.publicURL} alt={name} />
              </div>
              <span>{name}</span>
            </div>
          )
        })}
      </nav>
    </>
  )
}

LangSwitcher.propTypes = {
  className: PropTypes.string,
}

export default LangSwitcher
