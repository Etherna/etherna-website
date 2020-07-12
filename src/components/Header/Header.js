import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Link as AnchorLink } from "react-scroll"
import { Link } from "gatsby"

import SocialMenu from "@components/SocialMenu"

import "./header.scss"

const Header = ({ transparent }) => {
  const activeHeader = typeof window !== "undefined"
    ? document.documentElement.scrollTop > 100
    : false
  const [isActive, setIsActive] = useState(activeHeader)
  const [showContextualMenu, setShowContextualMenu] = useState(false)

  useEffect(() => {
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
            <img src={require("@images/logo.svg")} alt="Etherna" />
          </div>

          <button className="menu-toggle" onClick={() => setShowContextualMenu(!showContextualMenu)}>
            {!showContextualMenu && (
              <span className="mr-2">Menu</span>
            )}
            <img src={require("@images/svg/menu-toggle.svg")} alt=""/>
          </button>

          <div className={classnames("contextual-menu", {
            "contextual-menu-active": showContextualMenu
          })}>
            <div className="header-menu-row header-menu-row-fill">
              <nav className="header-menu header-menu-left">
                <AnchorLink to="transparency" className="header-link">Transparency</AnchorLink>
                <AnchorLink to="users" className="header-link">Users</AnchorLink>
                <AnchorLink to="innovative" className="header-link">Innovative</AnchorLink>
                <AnchorLink to="extendable" className="header-link">Extendable</AnchorLink>
              </nav>

              <nav className="header-menu header-menu-right">
                <Link to="blog" className="header-link">Blog</Link>
              </nav>
            </div>

            <div className="header-menu-row">
              <SocialMenu />
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