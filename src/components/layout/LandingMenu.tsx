import React from "react"
import { Link as AnchorLink } from "react-scroll"
import classNames from "classnames"

import headerLinkClasses from "@styles/components/layout/HeaderMenuLink.module.scss"

import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

const LandingMenu: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "header")

  return (
    <>
      <AnchorLink
        to="transparency"
        className={classNames(headerLinkClasses.headerMenuLink, headerLinkClasses.landingLink)}
        activeClass={headerLinkClasses.active}
        spy={true}
        smooth={true}
        duration={500}
      >
        {t`features`}
      </AnchorLink>
      <AnchorLink
        to="roadmap"
        className={classNames(headerLinkClasses.headerMenuLink, headerLinkClasses.landingLink)}
        activeClass={headerLinkClasses.active}
        spy={true}
        smooth={true}
        duration={500}
      >
        {t`roadmap`}
      </AnchorLink>
      <AnchorLink
        to="awards"
        className={classNames(headerLinkClasses.headerMenuLink, headerLinkClasses.landingLink)}
        activeClass={headerLinkClasses.active}
        spy={true}
        smooth={true}
        duration={500}
      >
        {t`awards`}
      </AnchorLink>
      <AnchorLink
        to="contacts"
        className={classNames(headerLinkClasses.headerMenuLink, headerLinkClasses.landingLink)}
        activeClass={headerLinkClasses.active}
        spy={true}
        smooth={true}
        duration={500}
      >
        {t`more`}
      </AnchorLink>
    </>
  )
}

export default LandingMenu
