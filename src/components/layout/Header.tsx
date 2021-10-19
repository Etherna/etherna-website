import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { Link } from "gatsby"

import classes from "@styles/components/layout/Header.module.scss"
import linkClasses from "@styles/components/layout/HeaderMenuLink.module.scss"

import HeaderMenu from "./HeaderMenu"
import LandingMenu from "./LandingMenu"
import ProjectsMenu from "./ProjectsMenu"
import PagesMenu from "./PagesMenu"
import UserMenu from "./UserMenu"
import SocialMenu from "./SocialMenu"
import LangSwitcher from "./LangSwitcher"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import routes from "@utils/routes"

type HeaderProps = {
  transparent?: boolean
  showLandingMenu?: boolean
}

const Header: React.FC<HeaderProps> = ({ transparent, showLandingMenu }) => {
  const [isActive, setIsActive] = useState(false)
  const [showContextualMenu, setShowContextualMenu] = useState(false)
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "header")

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
    <header className={classNames(classes.header, {
      [classes.transparent]: transparent,
      [classes.scrolled]: isActive || showContextualMenu,
    })}>
      <div className="container">
        <div className={classes.headerContainer}>
          <div className="logo">
            <Link to={routes.homePath(locale)}>
              <img src={require("@images/logo.svg").default} alt="Etherna" />
            </Link>
          </div>

          <button className={classes.headerToggle} onClick={() => setShowContextualMenu(!showContextualMenu)}>
            {!showContextualMenu && (
              <span className="mr-2">{t`menu`}</span>
            )}
            <div className={classNames(classes.headerToggleIcon, {
              [classes.open]: showContextualMenu
            })}>
              <span className={classes.lineTop}></span>
              <span className={classes.lineBottom}></span>
            </div>
          </button>

          <div className={classNames(classes.contextualMenu, {
            [classes.active]: showContextualMenu
          })}>
            <div className={classNames(classes.headerMenuRow, classes.rowFill)}>
              {showLandingMenu && (
                <HeaderMenu position="left" landingMenu>
                  <LandingMenu />
                </HeaderMenu>
              )}

              <HeaderMenu position="right">
                <PagesMenu toggleClassName={linkClasses.headerMenuLink} />
                <ProjectsMenu toggleClassName={linkClasses.headerMenuLink} />
                <Link to={routes.aboutPath(locale)} className={linkClasses.headerMenuLink}>{t`about`}</Link>
                <Link to={routes.blogPath(locale)} className={linkClasses.headerMenuLink}>{t`blog`}</Link>
              </HeaderMenu>
            </div>

            <div className={classes.headerMenuRow}>
              <SocialMenu linkClassName={classes.socialMenuLink} />
              <LangSwitcher toggleClassName={classes.langMenuToggle} />
              <UserMenu linkClassName={classes.userMenuLink} avatarClassName={classes.userMenuAvatar} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
