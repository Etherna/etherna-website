import React, { useRef } from "react"
import { Link as AnchorLink } from "react-scroll"
import classNames from "classnames"

import classes from "@styles/components/landing/Hero.module.scss"
import { ReactComponent as ArrowDown } from "@images/icons/arrow-down.svg"

import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLHeadingElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "hero")

  return (
    <section className={classes.hero}>
      <div className="container">
        <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
          <h1
            className={classNames(classes.heroTitle, "fade-in-up")}
            dangerouslySetInnerHTML={{ __html: t`heading` }}
            ref={titleRef}
          />
        </ViewportObserver>

        <ViewportObserver childrenRef={subheadingRef} viewportClassName="animation-active">
          <p
            className={classNames(classes.heroDescription, "fade-in-up", "delay-100")}
            dangerouslySetInnerHTML={{ __html: t`subheading` }}
            ref={subheadingRef}
          />
        </ViewportObserver>

        <ViewportObserver childrenRef={taglineRef} viewportClassName="animation-active">
          <h3 className={classNames(classes.heroTagline, "fade-in-up", "delay-200")} ref={taglineRef}>
            {t`tagline`}
          </h3>
        </ViewportObserver>

        <ViewportObserver childrenRef={moreRef} viewportClassName="animation-active">
          <div className="fade-in-up delay-300" ref={moreRef}>
            <AnchorLink
              to="transparency"
              className={classes.heroCta}
              spy={true}
              smooth={true}
              duration={500}
            >
              <ArrowDown />
              {t`learnMore`}
            </AnchorLink>
          </div>
        </ViewportObserver>
      </div>
    </section>
  )
}

export default Hero
