import React, { useRef } from "react"
import classNames from "classnames"

import classes from "@styles/components/landing/Hero.module.scss"

import Container from "@components/common/Container"
import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import Button from "@components/common/Button"

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "hero")

  return (
    <section className={classes.hero}>
      <Container className="flex flex-col items-center">
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

        <ViewportObserver childrenRef={ctaRef} viewportClassName="animation-active">
          <Button className="mt-8" type="primary" href="https://etherna.io" target="_blank" ref={ctaRef} large>
            {t`visitOurDapp`}
          </Button>
        </ViewportObserver>
      </Container>
    </section>
  )
}

export default Hero
