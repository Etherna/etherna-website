import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import EngFlag from "!svg-react-loader!@images/svg/flag-eng.svg"
import ItaFlag from "!svg-react-loader!@images/svg/flag-ita.svg"
import { useLocale } from "@utils/localizedPage"

import "./lang-switcher.scss"

const locales = {
  en: {
    icon: EngFlag,
    name: "English"
  },
  it: {
    icon: ItaFlag,
    name: "Italiano"
  }
}

const LangSwitcher = ({ className }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [position, setPosition] = useState({})
  const [locale, switchLocale] = useLocale()
  const toggleRef = useRef()
  const CurrentLocaleIcon = locales[locale].icon

  const handleMenuToggle = () => {
    const show = !showMenu

    if (show) {
      const toggleBounds = toggleRef.current.getBoundingClientRect()
      setPosition({
        top: `${toggleBounds.bottom}px`,
        right: `0px`
      })
    }

    setShowMenu(show)
  }

  return (
    <>
      {showMenu && (
        <div className="lang-switcher-backdrop" onClick={handleMenuToggle}></div>
      )}

      <button
        ref={toggleRef}
        className={classnames("lang-menu-toggle", className)}
        onClick={handleMenuToggle}
      >
        <div className="lang-image">
          <CurrentLocaleIcon />
        </div>
      </button>

      {showMenu && (
        <nav className="lang-switcher-menu" style={{ ...position }}>
          {Object.keys(locales).map((loc, i) => {
            const { name, icon: Icon } = locales[loc]
            return (
              <div
                className={classnames("lang-switcher-menu-item", {
                  "active": loc === locale
                })}
                onClick={() => switchLocale(loc)}
                key={i}
              >
                <div className="lang-image">
                  <Icon />
                </div>
                <span>{name}</span>
              </div>
            )
          })}
        </nav>
      )}
    </>
  )
}

LangSwitcher.propTypes = {
  className: PropTypes.string,
}

export default LangSwitcher
