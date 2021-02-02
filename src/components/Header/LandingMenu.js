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
        {trans("features")}
      </AnchorLink>

      <AnchorLink
        to="awards"
        className="header-link"
        activeClass="active"
        spy={true}
        smooth={true}
        duration={500}
      >
        {trans("awards")}
      </AnchorLink>

      <AnchorLink
        to="roadmap"
        className="header-link"
        activeClass="active"
        spy={true}
        smooth={true}
        duration={500}
      >
        {trans("roadmap")}
      </AnchorLink>
    </nav>
  )
}

export default LandingMenu
