import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Link } from "gatsby"

import LandingMenu from "./LandingMenu"
import ProjectsMenu from "./ProjectsMenu"
import UserMenu from "./UserMenu"
import SocialMenu from "@components/SocialMenu"
import LangSwitcher from "@components/LangSwitcher"
import { useTranslations } from "@utils/useTranslations"
import { useLocale } from "@utils/localizedPage"
import routes from "@utils/routes"

import "./header.scss"

const Header = ({ transparent, showLandingMenu }) => {
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
    const active = document.documentElement.scrollTop > 50
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
            <Link to={routes.homePath(locale)}>
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
              {showLandingMenu && (
                <LandingMenu />
              )}

              <nav className="header-menu header-menu-right">
                <ProjectsMenu />
                <Link to={routes.blogPath(locale)} className="header-link">{trans("blog")}</Link>
              </nav>
            </div>

            <div className="header-menu-row">
              <SocialMenu />
              <LangSwitcher />
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  transparent: PropTypes.bool,
  showLandingMenu: PropTypes.bool,
}

Header.defaultProps = {
  transparent: false,
  showLandingMenu: false
}

export default Header
