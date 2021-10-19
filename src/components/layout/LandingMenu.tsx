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
        {t`transparency`}
      </AnchorLink>
      <AnchorLink
        to="users"
        className={classNames(headerLinkClasses.headerMenuLink, headerLinkClasses.landingLink)}
        activeClass={headerLinkClasses.active}
        spy={true}
        smooth={true}
        duration={500}
      >
        {t`users`}
      </AnchorLink>
      <AnchorLink
        to="innovative"
        className={classNames(headerLinkClasses.headerMenuLink, headerLinkClasses.landingLink)}
        activeClass={headerLinkClasses.active}
        spy={true}
        smooth={true}
        duration={500}
      >
        {t`innovative`}
      </AnchorLink>
      <AnchorLink
        to="extendable"
        className={classNames(headerLinkClasses.headerMenuLink, headerLinkClasses.landingLink)}
        activeClass={headerLinkClasses.active}
        spy={true}
        smooth={true}
        duration={500}
      >
        {t`extendable`}
      </AnchorLink>
    </>
  )
}

export default LandingMenu
