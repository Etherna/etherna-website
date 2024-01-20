import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { Logo } from "@/components/assets/logo"

import { HeaderMenu, HeaderMenuLink } from "./header-menu"
import { LangSwitcher } from "./lang-switcher"
import { SocialMenu } from "./social-menu"
import { Container } from "@/components/common/container"
import { WhitepaperLink } from "@/components/common/whitepaper-link"
import { cn } from "@/utils/classnames"
import { routes } from "@/utils/routes"

import type { SocialUrls } from "./social-menu"
import type { Lang, LocaleInfo, LocalizedPaths } from "@/utils/lang"

interface HeaderProps {
  transparent?: boolean
  localizedPaths?: LocalizedPaths
  pages: { title: string; slug: string }[]
  whitepaperLink?: string | null
  locales: LocaleInfo[]
  lang: Lang
  socials: SocialUrls
}

export function Header({
  transparent,
  localizedPaths,
  pages,
  whitepaperLink,
  locales,
  lang,
  socials,
}: HeaderProps) {
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
      className={cn("fixed inset-x-0 top-0 z-10 transition duration-300", {
        "bg-white shadow-sm": !transparent || isScrolled,
      })}
    >
      <Container>
        <div className="flex flex-wrap items-center py-4 lg:flex-nowrap">
          <div>
            <a href={routes.homePath(lang)}>
              <Logo className="h-7" />
            </a>
          </div>

          {whitepaperLink && (
            <WhitepaperLink className="hidden sm:ml-3 sm:flex" url={whitepaperLink} />
          )}

          <button
            className="ml-auto flex items-center text-xs font-semibold uppercase text-gray-800 focus:shadow-transparent lg:hidden"
            onClick={() => setShowContextualMenu(!showContextualMenu)}
          >
            {!showContextualMenu && <span className="mr-2">{t`menu`}</span>}
            <div className="relative h-[30px] w-[30px]">
              <span
                className={cn(
                  "absolute left-0 top-0 h-full w-full transition duration-300 ease-in-out",
                  {
                    "rotate-45": showContextualMenu,
                  }
                )}
              >
                <div
                  className={cn(
                    "absolute left-1 top-2.5 h-0.5 w-[22px] rounded-[1px] bg-gray-900",
                    {
                      "left-1 top-3": showContextualMenu,
                    }
                  )}
                />
              </span>
              <span
                className={cn(
                  "absolute left-0 top-0 h-full w-full transition duration-300 ease-in-out",
                  {
                    "-rotate-45": showContextualMenu,
                  }
                )}
              >
                <div
                  className={cn(
                    "absolute bottom-2.5 left-1 h-0.5 w-[22px] rounded-[1px] bg-gray-900",
                    {
                      "left-1.5 top-3.5": showContextualMenu,
                    }
                  )}
                />
              </span>
            </div>
          </button>

          <div
            ref={contextualMenu}
            className={cn(
              "flex w-full origin-top flex-wrap overflow-hidden lg:flex-nowrap",
              "h-0 transition-[height] duration-300 ease-in-out lg:!h-auto",
              {
                "opacity-100": showContextualMenu,
              }
            )}
            style={{
              height: `${showContextualMenu ? contextualMenu.current?.scrollHeight : 0}px`,
            }}
          >
            <div className="flex w-full flex-nowrap items-center overflow-x-auto py-2 lg:w-auto lg:flex-1 lg:overflow-x-visible lg:py-0">
              <HeaderMenu correctMobile>
                {whitepaperLink && (
                  <WhitepaperLink className="flex sm:hidden" url={whitepaperLink} />
                )}
              </HeaderMenu>

              <HeaderMenu position="right">
                {pages.map(page => (
                  <HeaderMenuLink key={page.slug} href={routes.pagePath(page.slug, lang)}>
                    {page.title}
                  </HeaderMenuLink>
                ))}
                <HeaderMenuLink href={routes.aboutPath(lang)}>{t`about`}</HeaderMenuLink>
                <HeaderMenuLink href={routes.blogPath(lang)}>{t`blog`}</HeaderMenuLink>
              </HeaderMenu>
            </div>

            <div className="flex w-full flex-nowrap items-center overflow-x-auto py-2 lg:w-auto lg:overflow-x-visible lg:py-0">
              <SocialMenu linkClassName="first-of-type:pl-0" socials={socials} />
              <LangSwitcher
                toggleClassName="ml-4"
                lang={lang}
                locales={locales}
                localizedPaths={localizedPaths}
              />
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
