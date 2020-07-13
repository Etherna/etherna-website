import React from "react"
import { Link as AnchorLink } from "react-scroll"

import { useTranslations } from "@utils/useTranslations"
import { useLocale } from "@utils/localizedPage"

const LandingMenu = () => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "header")

  return (
    <nav className="header-menu header-menu-left landing-menu">
      <AnchorLink
        to="transparency"
        className="header-link"
        activeClass="active"
        spy={true}
        smooth={true}
        duration={500}
      >
        {trans("transparency")}
      </AnchorLink>
      <AnchorLink
        to="users"
        className="header-link"
        activeClass="active"
        spy={true}
        smooth={true}
        duration={500}
      >
        {trans("users")}
      </AnchorLink>
      <AnchorLink
        to="innovative"
        className="header-link"
        activeClass="active"
        spy={true}
        smooth={true}
        duration={500}
      >
        {trans("innovative")}
      </AnchorLink>
      <AnchorLink
        to="extendable"
        className="header-link"
        activeClass="active"
        spy={true}
        smooth={true}
        duration={500}
      >
        {trans("extendable")}
      </AnchorLink>
    </nav>
  )
}

export default LandingMenu
