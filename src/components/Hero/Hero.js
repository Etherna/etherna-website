import React, { useRef } from "react"
import { Link as AnchorLink } from "react-scroll"

import ArrowDown from "!svg-react-loader!@images/icons/arrow-down.svg"
import ViewportObserver from "@components/ViewportObserver"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

import "./hero.scss"

const Hero = () => {
  const titleRef = useRef()
  const subheadingRef = useRef()
  const taglineRef = useRef()
  const moreRef = useRef()
  const [locale] = useLocale()
  const trans = useTranslations(locale, "hero")

  return (
    <section className="hero">
      <div className="container">
        <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
          <h1
            className="hero-title fade-in-up"
            dangerouslySetInnerHTML={{ __html: trans("heading") }}
            ref={titleRef}
          />
        </ViewportObserver>

        <ViewportObserver childrenRef={subheadingRef} viewportClassName="animation-active">
          <p
            className="hero-description fade-in-up delay-100"
            dangerouslySetInnerHTML={{ __html: trans("subheading") }}
            ref={subheadingRef}
          />
        </ViewportObserver>

        <ViewportObserver childrenRef={taglineRef} viewportClassName="animation-active">
          <h3 className="hero-tagline fade-in-up delay-200" ref={taglineRef}>
            {trans("tagline")}
          </h3>
        </ViewportObserver>

        <ViewportObserver childrenRef={moreRef} viewportClassName="animation-active">
          <div className="fade-in-up delay-300" ref={moreRef}>
            <AnchorLink
              to="transparency"
              className="hero-cta"
              spy={true}
              smooth={true}
              duration={500}
            >
              <ArrowDown />
              {trans("learnMore")}
            </AnchorLink>
          </div>
        </ViewportObserver>
      </div>
    </section>
  )
}

export default Hero
