import React, { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as Logo } from "@/images/logo.svg"

import HeaderMenu from "./HeaderMenu"
import LangSwitcher from "./LangSwitcher"
import SocialMenu from "./SocialMenu"
import Container from "@/components/common/Container"
import WhitepaperLink from "@/components/common/WhitepaperLink"
import classNames from "@/utils/classnames"
import routes from "@/utils/routes"

import type { Lang, LocaleInfo, LocalizedPaths } from "@/utils/lang"

type HeaderProps = {
  transparent?: boolean
  localizedPaths?: LocalizedPaths
  pages: { title: string; slug: string }[]
  locales: LocaleInfo[]
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

  const isScrolled = isActive || showContextualMenu

  return (
    <header
      className={classNames("fixed inset-x-0 top-0 z-10 transition duration-300", {
        "bg-white shadow-sm": !transparent || isScrolled,
      })}
    >
      <Container>
        <div className="flex flex-wrap items-center py-4 lg:flex-nowrap">
          <div>
            <a href={routes.homePath(lang)}>
              <Logo className="h-[30px]" />
            </a>
          </div>

          <WhitepaperLink
            className="hidden sm:ml-3 sm:flex"
            url="todo!!!"
            filename="whitepaper.pdf"
          />

          <button
            className="ml-auto flex items-center text-xs font-semibold uppercase text-gray-800 focus:shadow-transparent lg:hidden"
            onClick={() => setShowContextualMenu(!showContextualMenu)}
          >
            {!showContextualMenu && <span className="mr-2">{t`menu`}</span>}
            <div className="relative h-[30px] w-[30px]">
              <span
                className={classNames(
                  "absolute left-0 top-0 h-full w-full transition duration-300 ease-in-out",
                  {
                    "rotate-45": showContextualMenu,
                  }
                )}
              >
                <div
                  className={classNames(
                    "absolute left-1 top-2.5 h-0.5 w-[22px] rounded-[1px] bg-gray-900",
                    {
                      "top-3 left-1": showContextualMenu,
                    }
                  )}
                />
              </span>
              <span
                className={classNames(
                  "absolute left-0 top-0 h-full w-full transition duration-300 ease-in-out",
                  {
                    "-rotate-45": showContextualMenu,
                  }
                )}
              >
                <div
                  className={classNames(
                    "absolute left-1 bottom-2.5 h-0.5 w-[22px] rounded-[1px] bg-gray-900",
                    {
                      "top-3.5 left-1.5": showContextualMenu,
                    }
                  )}
                />
              </span>
            </div>
          </button>

          <div
            className={classNames(
              "flex w-full origin-top flex-wrap overflow-hidden lg:flex-nowrap",
              "h-0 transition-[height] duration-300 ease-in-out lg:!h-auto",
              {
                "opacity-100": showContextualMenu,
              }
            )}
            style={{
              height: `${showContextualMenu ? contextualMenu.current?.scrollHeight : 0}px`,
            }}
            ref={contextualMenu}
          >
            <div className="flex w-full flex-nowrap items-center overflow-x-auto py-2 lg:w-auto lg:flex-1 lg:overflow-x-visible lg:py-0">
              <HeaderMenu correctMobile>
                <WhitepaperLink
                  url="todo!!!"
                  filename="whitepaper.pdf"
                  className="flex sm:hidden"
                />
              </HeaderMenu>

              <HeaderMenu position="right">
                {pages.map((page, i) => (
                  <HeaderMenu.Link href={routes.pagePath(page.slug, lang)} key={i}>
                    {page.title}
                  </HeaderMenu.Link>
                ))}
                <HeaderMenu.Link href={routes.aboutPath(lang)}>{t`about`}</HeaderMenu.Link>
                <HeaderMenu.Link href={routes.blogPath(lang)}>{t`blog`}</HeaderMenu.Link>
              </HeaderMenu>
            </div>

            <div className="flex w-full flex-nowrap items-center overflow-x-auto py-2 lg:w-auto lg:overflow-x-visible lg:py-0">
              <SocialMenu linkClassName="first-of-type:pl-0" />
              <LangSwitcher
                toggleClassName="ml-4"
                lang={lang}
                locales={locales}
                localizedPaths={localizedPaths}
              />
              {/* <UserMenu
                linkClassName="ml-4"
                avatarClassName="block h-5 w-5 overflow-hidden rounded-full"
              /> */}
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
