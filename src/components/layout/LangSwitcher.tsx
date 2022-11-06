import React from "react"
import { Link } from "gatsby"
import classNames from "@utils/classnames"

import classes from "@styles/components/layout/LangSwitcher.module.scss"

import Dropdown from "@components/common/Dropdown"
import useLocaleInfo, { LocaleInfo } from "@hooks/useLocaleInfo"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useDropdownContext } from "@context/dropdown-context"

type LangSwitcherProps = {
  toggleClassName?: string
}

const LangSwitcher: React.FC<LangSwitcherProps> = ({ toggleClassName }) => {
  const [localeInfo, locales] = useLocaleInfo()
  const [locale] = useLocale()
  const currentLocaleFlag = localeInfo(locale).flag.localFile.publicURL

  return (
    <Dropdown
      toggleClass={classNames(classes.langMenuToggle, toggleClassName)}
      toggleChildren={
        <div className={classes.langImage}>
          <img src={currentLocaleFlag} alt="" />
        </div>
      }
    >
      <LangSwitcherMenu locales={locales} />
    </Dropdown>
  )
}

const LangSwitcherMenu: React.FC<{ locales: LocaleInfo[] }> = ({ locales }) => {
  const [locale, { getLocalePath }] = useLocale()

  return (
    <nav className={classes.langSwitcherMenu}>
      {locales.map((loc, i) => {
        const { code, name, flag } = loc
        const localePath = getLocalePath(code)

        return (
          <LinkWrapper
            to={localePath}
            className={classNames(classes.langSwitcherMenuItem, {
              [classes.active]: code === locale
            })}
            code={code}
            name={name}
            key={i}
          >
            <div className={classes.langImage}>
              <img src={flag.localFile.publicURL} alt={name} />
            </div>
            <span>{name}</span>
          </LinkWrapper>
        )
      })}
    </nav>
  )
}

type LinkWrapperProps = {
  className?: string
  to?: string
  code: string
  name: string
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({ children, className, to, code, name }) => {
  const [, { switchLocale }] = useLocale()
  const [, setShowMenu] = useDropdownContext()

  const handleSwitchLocale = (locale: string, e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") {
      // Trigger only with ENTER
      return
    }

    switchLocale(locale)
    setShowMenu(false)
  }

  return to ? (
    <Link
      to={to}
      className={className}
      onClick={e => handleSwitchLocale(code, e)}
      aria-label={`Switch to ${name}`}
    >
      {children}
    </Link>
  ) : (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${name}`}
      onClick={e => handleSwitchLocale(code, e)}
      onKeyDown={e => handleSwitchLocale(code, e)}
    >
      {children}
    </div>
  )
}

export default LangSwitcher
