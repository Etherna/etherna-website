import React, { useEffect, useRef } from "react"
import classNames from "classnames"

import classes from "@styles/components/landing/Landing.module.scss"
import { ReactComponent as EthereumLogo } from "@images/logos/ethereum-logo.svg"
import { ReactComponent as SwarmLogo } from "@images/logos/swarm-logo.svg"
import { ReactComponent as MongodbLogo } from "@images/logos/mongodb-logo.svg"
import { ReactComponent as ReactLogo } from "@images/logos/react-logo.svg"
import { ReactComponent as NewsletterImage } from "@images/newsletter.svg"

import Awards from "./Awards"
import Contacts from "./Contacts"
import LandingSection from "./LandingSection"
import NewsletterForm from "./NewsletterForm"
import Card from "@components/common/Card"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import ViewportObserver from "@components/layout/ViewportObserver"
import SocialMenu from "@components/layout/SocialMenu"
import useLocale from "@context/locale-context/hooks/useLocale"
import useLocaleInfo from "@hooks/useLocaleInfo"
import { useTranslations } from "@hooks/useTranslations"
import routes from "@utils/routes"
import Roadmap from "./Roadmap"

const Landing: React.FC = () => {
  const builtRef = useRef<HTMLDivElement>(null)
  const [locale, { setLocalePath }] = useLocale()
  const [, locales] = useLocaleInfo()
  const { t } = useTranslations(locale, "landing")

  useEffect(() => {
    setLocalePaths()
    return () => clearLocalePaths()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocalePaths = () => {
    locales.forEach(info => {
      setLocalePath(info.code, routes.homePath(info.code))
    })
  }

  const clearLocalePaths = () => {
    locales.forEach(info => {
      setLocalePath(info.code, undefined)
    })
  }

  return (
    <>
      <ViewportObserver childrenRef={builtRef} viewportClassName="animation-active" offset={200}>
        <section className={classNames(classes.builtwith, "fade-in-up", "delay-50")} ref={builtRef}>
          <Container>
            <Row>
              <Col>
                <Card className="py-8">
                  <div className="flex flex-col items-center">
                    <div className={classes.textLabel}>{t`builtWith`}</div>
                    <Container className="mt-8">
                      <Row>
                        <Col className="w-1/2 sm:w-1/4 mb-6">
                          <a href={t`ethereumUrl`} target="_blank" rel="noreferrer noopener">
                            <EthereumLogo />
                          </a>
                        </Col>
                        <Col className="w-1/2 sm:w-1/4 mb-6">
                          <a href={t`swarmUrl`} target="_blank" rel="noreferrer noopener">
                            <SwarmLogo />
                          </a>
                        </Col>
                        <Col className="w-1/2 sm:w-1/4 mb-6">
                          <a href={t`mongodbUrl`} target="_blank" rel="noreferrer noopener">
                            <MongodbLogo />
                          </a>
                        </Col>
                        <Col className="w-1/2 sm:w-1/4 mb-6">
                          <a href={t`reactUrl`} target="_blank" rel="noreferrer noopener">
                            <ReactLogo />
                          </a>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </ViewportObserver>

      <LandingSection
        id="transparency"
        title={t`transparency`}
        description={t`transparencyDescription`}
        features={[{
          icon: require("@images/icons/feature-shadow-ban.svg").default,
          title: t`transparencyFeatures.0.title`,
          description: t`transparencyFeatures.0.description`
        }, {
          icon: require("@images/icons/feature-speech-freedom.svg").default,
          title: t`transparencyFeatures.1.title`,
          description: t`transparencyFeatures.1.description`
        }, {
          icon: require("@images/icons/feature-open-source.svg").default,
          title: t`transparencyFeatures.2.title`,
          description: t`transparencyFeatures.2.description`
        }, {
          icon: require("@images/icons/feature-community.svg").default,
          title: t`transparencyFeatures.3.title`,
          description: t`transparencyFeatures.3.description`
        }]}
      />

      <LandingSection
        id="users"
        title={t`users`}
        description={t`usersDescription`}
        features={[{
          icon: require("@images/icons/feature-no-ads.svg").default,
          title: t`usersFeatures.0.title`,
          description: t`usersFeatures.0.description`
        }, {
          icon: require("@images/icons/feature-creativity.svg").default,
          title: t`usersFeatures.1.title`,
          description: t`usersFeatures.1.description`
        }, {
          icon: require("@images/icons/feature-viewers.svg").default,
          title: t`usersFeatures.2.title`,
          description: t`usersFeatures.2.description`
        }, {
          icon: require("@images/icons/feature-revenue.svg").default,
          title: t`usersFeatures.3.title`,
          description: t`usersFeatures.3.description`
        }]}
      />

      <LandingSection
        id="innovative"
        title={t`innovative`}
        description={t`innovativeDescription`}
        features={[{
          icon: require("@images/icons/feature-decentralized.svg").default,
          title: t`innovativeFeatures.0.title`,
          description: t`innovativeFeatures.0.description`
        }, {
          icon: require("@images/icons/feature-permanent.svg").default,
          title: t`innovativeFeatures.1.title`,
          description: t`innovativeFeatures.1.description`
        }]}
      />

      <LandingSection
        id="extendable"
        title={t`extendable`}
        description={t`extendableDescription`}
        features={[{
          icon: require("@images/icons/feature-index.svg").default,
          title: t`extendableFeatures.0.title`,
          description: t`extendableFeatures.0.description`
        }, {
          icon: require("@images/icons/feature-gateway.svg").default,
          title: t`extendableFeatures.1.title`,
          description: t`extendableFeatures.1.description`
        }]}
      />

      <Roadmap />

      <Awards />

      <Contacts />

      <section className="social my-16">
        <Container>
          <Row>
            <Col>
              <Card className="" size="large">
                <div className="flex flex-col items-center">
                  <h4 className="text-4xl leading-tight font-extrabold text-gray-700 text-center">
                    {t`contact`}
                  </h4>
                  <NewsletterImage width="120" />
                  <NewsletterForm />

                  <hr className="w-24 my-12" />

                  <p className="text-gray-600 mb-4">{t`followUs`}</p>
                  <SocialMenu vertical={true} buttonStyle={true} />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  )
}

export default Landing
