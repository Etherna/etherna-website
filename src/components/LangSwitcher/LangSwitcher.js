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

  const LinkWrapper = ({ children, className, path, code, name }) => path ? (
    <Link
      to={path}
      className={className}
      aria-label={`Switch to ${name}`}
    >
      {children}
    </Link>
  ) : (
    <div
      className={className}
      role="button"
      tabIndex="0"
      aria-label={`Switch to ${name}`}
      onClick={e => handleSwitchLocale(code, e)}
      onKeyDown={e => handleSwitchLocale(code, e)}
    >
      {children}
    </div>
  )

  return (
    <nav className="lang-switcher-menu">
      {locales.map((loc, i) => {
        const { code, name, flag } = loc
        const localePath = getLocalePath(code)

        return (
          <LinkWrapper
            path={localePath}
            className={classnames("lang-switcher-menu-item", {
              "active": code === locale
            })}
            code={code}
            name={name}
            key={i}
          >
            <div className="lang-image">
              <img src={flag.localFile.publicURL} alt={name} />
            </div>
            <span>{name}</span>
          </LinkWrapper>
        )
      })}
    </nav>
  )
}

LangSwitcher.propTypes = {
  className: PropTypes.string,
}

export default LangSwitcher
