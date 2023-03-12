import React, { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

import classes from "@/styles/components/layout/Header.module.scss"
import linkClasses from "@/styles/components/layout/HeaderMenuLink.module.scss"

import HeaderMenu from "./HeaderMenu"
import LangSwitcher from "./LangSwitcher"
import SocialMenu from "./SocialMenu"
import Container from "@/components/common/Container"
import WhitepaperLink from "@/components/common/WhitepaperLink"
import { ReactComponent as Logo } from "@/images/logo.svg"
import classNames from "@/utils/classnames"
import routes from "@/utils/routes"

import type { Lang, LocalizedPaths } from "@/utils/lang"

type HeaderProps = {
  transparent?: boolean
  showLandingMenu?: boolean
  localizedPaths?: LocalizedPaths
  pages: { title: string; slug: string }[]
  locales: { code: string; name: string; flag: string }[]
  lang: Lang
}

const Header: React.FC<HeaderProps> = ({ transparent, localizedPaths, pages, locales, lang }) => {
  const [isActive, setIsActive] = useState(false)
  const [showContextualMenu, setShowContextualMenu] = useState(false)
  const contextualMenu = useRef<HTMLDivElement>(null)
  const { t } = useTranslation("header")

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
    <header
      className={classNames(classes.header, {
        [classes.transparent]: transparent,
        [classes.scrolled]: isActive || showContextualMenu,
      })}
    >
      <Container>
        <div className={classes.headerContainer}>
          <div className={classes.headerLogo}>
            <a href={routes.homePath(lang)}>
              <Logo />
            </a>
          </div>

          <WhitepaperLink
            className={classNames(linkClasses.headerMenuLink, "hidden sm:ml-3 sm:flex")}
            url=""
            filename="whitepaper.pdf"
          />

          <button
            className={classes.headerToggle}
            onClick={() => setShowContextualMenu(!showContextualMenu)}
          >
            {!showContextualMenu && <span className="mr-2">{t`menu`}</span>}
            <div
              className={classNames(classes.headerToggleIcon, {
                [classes.open]: showContextualMenu,
              })}
            >
              <span className={classes.lineTop}></span>
              <span className={classes.lineBottom}></span>
            </div>
          </button>

          <div
            className={classNames(classes.contextualMenu, {
              [classes.active]: showContextualMenu,
            })}
            style={
              {
                ["--menu-height"]: `${contextualMenu.current?.scrollHeight}px`,
              } as any
            }
            ref={contextualMenu}
          >
            <div className={classNames(classes.headerMenuRow, classes.rowFill)}>
              {/* {showLandingMenu && (
                <HeaderMenu position="left" landingMenu>
                  <LandingMenu />
                </HeaderMenu>
              )} */}

              <HeaderMenu correctMobile>
                <WhitepaperLink
                  className={classNames(linkClasses.headerMenuLink, "flex sm:hidden")}
                  url=""
                  filename="whitepaper.pdf"
                />
              </HeaderMenu>

              <HeaderMenu position="right">
                {pages.map((page, i) => (
                  <a
                    href={routes.pagePath(page.slug, lang)}
                    className={linkClasses.headerMenuLink}
                    key={i}
                  >
                    {page.title}
                  </a>
                ))}
                <a
                  href={routes.aboutPath(lang)}
                  className={linkClasses.headerMenuLink}
                >{t`about`}</a>
                <a href={routes.blogPath(lang)} className={linkClasses.headerMenuLink}>{t`blog`}</a>
              </HeaderMenu>
            </div>

            <div className={classes.headerMenuRow}>
              <SocialMenu linkClassName={classes.socialMenuLink} />
              <LangSwitcher
                toggleClassName={classes.langMenuToggle}
                lang={lang}
                locales={locales}
                localizedPaths={localizedPaths}
              />
              {/* <UserMenu
                linkClassName={classes.userMenuLink}
                avatarClassName={classes.userMenuAvatar}
              /> */}
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
