import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Link } from "gatsby"

import DropDown, { useDropdownContext } from "@components/common/DropDown"
import useLocaleInfo from "@utils/useLocaleInfo"
import { useLocale } from "@utils/localizedPage"

import "./lang-switcher.scss"

const LangSwitcher = ({ className }) => {
  const [localeInfo, locales] = useLocaleInfo()
  const [locale] = useLocale()
  const currentLocaleFlag = localeInfo(locale).flag.localFile.publicURL

  return (
    <DropDown
      toggleClass={classnames("lang-menu-toggle", className)}
      toggleChildren={
        <div className="lang-image">
          <img src={currentLocaleFlag} alt="" />
        </div>
      }
    >
      <LangSwitcherMenu locales={locales} />
    </DropDown>
  )
}

const LangSwitcherMenu = ({ locales }) => {
  const [locale, { switchLocale, getLocalePath }] = useLocale()
  const [,setShowMenu] = useDropdownContext()

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
    <nav className="lang-switcher-menu">
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
  )
}

LangSwitcher.propTypes = {
  className: PropTypes.string,
}

export default LangSwitcher
