import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Link as AnchorLink } from "react-scroll"
import { Link } from "gatsby"

import SocialMenu from "@components/SocialMenu"
import LangSwitcher from "@components/LangSwitcher"
import { useTranslations } from "@utils/useTranslations"
import { useLocale } from "@utils/localizedPage"

import "./header.scss"

const Header = ({ transparent }) => {
  const [isActive, setIsActive] = useState(false)
  const [showContextualMenu, setShowContextualMenu] = useState(false)
  const [locale] = useLocale()
  const trans = useTranslations(locale, "header")

  useEffect(() => {
    handlePageScroll()
    window.addEventListener("scroll", handlePageScroll)
    return () => {
      window.removeEventListener("scroll", handlePageScroll)
    }
  }, [])

  const handlePageScroll = () => {
    const active = document.documentElement.scrollTop > 100
    setIsActive(active)
  }

  return (
    <header className={classnames("header", {
      "header-transparent": transparent,
      "header-active": isActive || showContextualMenu,
    })}>
      <div className="container">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src={require("@images/logo.svg")} alt="Etherna" />
            </Link>
          </div>

          <button className="menu-toggle" onClick={() => setShowContextualMenu(!showContextualMenu)}>
            {!showContextualMenu && (
              <span className="mr-2">{trans("menu")}</span>
            )}
            <div className={classnames("menu-toggle-icon", {
              "menu-toggle-icon-active": showContextualMenu
            })}>
              <span className="line-top"></span>
              <span className="line-bottom"></span>
            </div>
          </button>

          <div className={classnames("contextual-menu", {
            "contextual-menu-active": showContextualMenu
          })}>
            <div className="header-menu-row header-menu-row-fill">
              <nav className="header-menu header-menu-left">
                <AnchorLink to="transparency" className="header-link">{trans("transparency")}</AnchorLink>
                <AnchorLink to="users" className="header-link">{trans("users")}</AnchorLink>
                <AnchorLink to="innovative" className="header-link">{trans("innovative")}</AnchorLink>
                <AnchorLink to="extendable" className="header-link">{trans("extendable")}</AnchorLink>
              </nav>

              <nav className="header-menu header-menu-right">
                <Link to="blog" className="header-link">{trans("blog")}</Link>
              </nav>
            </div>

            <div className="header-menu-row">
              <SocialMenu />
              <LangSwitcher className="ml-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  transparent: PropTypes.bool,
}

Header.defaultProps = {
  transparent: false
}

export default Header
