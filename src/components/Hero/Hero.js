import React from "react"
import { Link as AnchorLink } from "react-scroll"

import ArrowDown from "!svg-react-loader!@images/icons/arrow-down.svg"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

import "./hero.scss"

const Hero = () => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "hero")

  return (
    <div className="hero">
      <div className="container">
        <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: trans("heading") }} />

        <p className="hero-description" dangerouslySetInnerHTML={{ __html: trans("subheading") }} />

        <h3 className="hero-tagline">{trans("tagline")}</h3>

        <div>
          <AnchorLink to="transparency" className="hero-cta">
            <ArrowDown />
            {trans("learnMore")}
          </AnchorLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
