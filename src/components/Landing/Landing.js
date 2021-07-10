import React, { useEffect, useRef } from "react"

import EthereumLogo from "!svg-react-loader!@images/logos/ethereum-logo.svg"
import SwarmLogo from "!svg-react-loader!@images/logos/swarm-logo.svg"
import MongodbLogo from "!svg-react-loader!@images/logos/mongodb-logo.svg"
import ReactLogo from "!svg-react-loader!@images/logos/react-logo.svg"

import LandingSection from "./LandingSection"
import Card from "@components/common/Card"
import ViewportObserver from "@components/ViewportObserver"
import SocialMenu from "@components/SocialMenu"
import Awards from "@components/Awards"
import Contacts from "@components/Contacts/Contacts"
import NewsletterForm from "@components/NewsletterForm"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"
import useLocaleInfo from "@utils/useLocaleInfo"
import routes from "@utils/routes"

import "./landing.scss"

const Landing = () => {
  const builtRef = useRef()
  const [locale, { setLocalePath }] = useLocale()
  const [, locales] = useLocaleInfo()
  const trans = useTranslations(locale, "landing")

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
        <section className="builtwith fade-in-up delay-50" ref={builtRef}>
          <div className="container">
            <div className="row">
              <div className="col">
                <Card className="py-8">
                  <div className="flex flex-col items-center">
                    <div className="text-label">{trans("builtWith")}</div>
                    <div className="container mt-8">
                      <div className="row">
                        <div className="col w-1/2 sm:w-1/4 mb-6">
                          <a href={trans("ethereumUrl")} target="_blank" rel="noreferrer noopener">
                            <EthereumLogo />
                          </a>
                        </div>
                        <div className="col w-1/2 sm:w-1/4 mb-6">
                          <a href={trans("swarmUrl")} target="_blank" rel="noreferrer noopener">
                            <SwarmLogo />
                          </a>
                        </div>
                        <div className="col w-1/2 sm:w-1/4 mb-6">
                          <a href={trans("mongodbUrl")} target="_blank" rel="noreferrer noopener">
                            <MongodbLogo />
                          </a>
                        </div>
                        <div className="col w-1/2 sm:w-1/4 mb-6">
                          <a href={trans("reactUrl")} target="_blank" rel="noreferrer noopener">
                            <ReactLogo />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </ViewportObserver>

      <LandingSection
        id="transparency"
        title={trans("transparency")}
        description={trans("transparencyDescription")}
        features={[{
          icon: require("@images/icons/feature-shadow-ban.svg").default,
          title: trans("transparencyFeatures.0.title"),
          description: trans("transparencyFeatures.0.description")
        }, {
          icon: require("@images/icons/feature-speech-freedom.svg").default,
          title: trans("transparencyFeatures.1.title"),
          description: trans("transparencyFeatures.1.description")
        }, {
          icon: require("@images/icons/feature-open-source.svg").default,
          title: trans("transparencyFeatures.2.title"),
          description: trans("transparencyFeatures.2.description")
        }, {
          icon: require("@images/icons/feature-community.svg").default,
          title: trans("transparencyFeatures.3.title"),
          description: trans("transparencyFeatures.3.description")
        }]}
      />

      <LandingSection
        id="users"
        title={trans("users")}
        description={trans("usersDescription")}
        features={[{
          icon: require("@images/icons/feature-no-ads.svg").default,
          title: trans("usersFeatures.0.title"),
          description: trans("usersFeatures.0.description")
        }, {
          icon: require("@images/icons/feature-creativity.svg").default,
          title: trans("usersFeatures.1.title"),
          description: trans("usersFeatures.1.description")
        }, {
          icon: require("@images/icons/feature-viewers.svg").default,
          title: trans("usersFeatures.2.title"),
          description: trans("usersFeatures.2.description")
        }, {
          icon: require("@images/icons/feature-revenue.svg").default,
          title: trans("usersFeatures.3.title"),
          description: trans("usersFeatures.3.description")
        }]}
      />

      <LandingSection
        id="innovative"
        title={trans("innovative")}
        description={trans("innovativeDescription")}
        features={[{
          icon: require("@images/icons/feature-decentralized.svg").default,
          title: trans("innovativeFeatures.0.title"),
          description: trans("innovativeFeatures.0.description")
        }, {
          icon: require("@images/icons/feature-permanent.svg").default,
          title: trans("innovativeFeatures.1.title"),
          description: trans("innovativeFeatures.1.description")
        }]}
      />

      <LandingSection
        id="extendable"
        title={trans("extendable")}
        description={trans("extendableDescription")}
        features={[{
          icon: require("@images/icons/feature-index.svg").default,
          title: trans("extendableFeatures.0.title"),
          description: trans("extendableFeatures.0.description")
        }, {
          icon: require("@images/icons/feature-gateway.svg").default,
          title: trans("extendableFeatures.1.title"),
          description: trans("extendableFeatures.1.description")
        }]}
      />

      <Awards />

      <Contacts />

      <section className="social my-16">
        <div className="container">
          <div className="row">
            <div className="col">
              <Card className="" size="lg">
                <div className="flex flex-col items-center">
                  <h4 className="text-4xl leading-tight font-extrabold text-gray-700 text-center">
                    {trans("contact")}
                  </h4>
                  <img src={require("../../images/newsletter.svg").default} alt="" width="120" />
                  <NewsletterForm />

                  <hr className="w-24 my-12" />

                  <p className="text-gray-600 mb-4">{trans("followUs")}</p>
                  <SocialMenu vertical={true} buttonStyle={true} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Landing
