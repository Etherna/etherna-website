import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Link as AnchorLink } from "react-scroll"
import { Link } from "gatsby"

import SocialMenu from "@components/SocialMenu"

import "./header.scss"

const Header = ({ transparent }) => {
  const [isActive, setIsActive] = useState(false)

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
      "header-active": isActive,
    })}>
      <div className="container">
        <div className="header-container">
          <div className="logo">
            <img src={require("@images/logo.svg")} alt="Etherna" />
          </div>

          <nav className="header-menu mr-auto">
            <AnchorLink to="transparency" className="header-link">Transparency</AnchorLink>
            <AnchorLink to="users" className="header-link">Users</AnchorLink>
            <AnchorLink to="innovative" className="header-link">Innovative</AnchorLink>
            <AnchorLink to="extendable" className="header-link">Extendable</AnchorLink>
          </nav>

          <nav className="header-menu ml-auto">
            <Link to="blog" className="header-link">Blog</Link>
          </nav>

          <SocialMenu />
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