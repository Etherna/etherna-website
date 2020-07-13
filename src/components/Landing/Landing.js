import React from "react"

import EthereumLogo from "!svg-react-loader!@images/logo-ethereum.svg"
import SwarmLogo from "!svg-react-loader!@images/logo-swarm.svg"
import ReactLogo from "!svg-react-loader!@images/logo-react.svg"
import LandingSection from "./LandingSection"
import Card from "@components/common/Card"
import SocialMenu from "@components/SocialMenu"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

import "./landing.scss"

const Landing = () => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "landing")

  return (
    <>
      <section className="builtwith">
        <div className="container">
          <div className="row">
            <div className="col">
              <Card className="py-8">
                <div className="flex flex-col items-center">
                  <div className="text-label">{trans("builtWith")}</div>
                  <div className="container mt-8">
                    <div className="row">
                      <div className="col sm:w-1/3 mb-6">
                        <EthereumLogo />
                      </div>
                      <div className="col sm:w-1/3 mb-6">
                        <SwarmLogo />
                      </div>
                      <div className="col sm:w-1/3 mb-6">
                        <ReactLogo />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <LandingSection
        id="transparency"
        title={trans("transparency")}
        description={trans("transparencyDescription")}
        features={[{
          icon: require("@images/svg/feature-shadow-ban.svg"),
          title: trans("transparencyFeatures.0.title"),
          description: trans("transparencyFeatures.0.description")
        }, {
          icon: require("@images/svg/feature-speech-freedom.svg"),
          title: trans("transparencyFeatures.1.title"),
          description: trans("transparencyFeatures.1.description")
        }, {
          icon: require("@images/svg/feature-open-source.svg"),
          title: trans("transparencyFeatures.2.title"),
          description: trans("transparencyFeatures.2.description")
        }]}
      />

      <LandingSection
        id="users"
        title={trans("users")}
        description={trans("usersDescription")}
        features={[{
          icon: require("@images/svg/feature-creativity.svg"),
          title: trans("usersFeatures.0.title"),
          description: trans("usersFeatures.0.description")
        }, {
          icon: require("@images/svg/feature-viewers.svg"),
          title: trans("usersFeatures.1.title"),
          description: trans("usersFeatures.1.description")
        }, {
          icon: require("@images/svg/feature-revenue.svg"),
          title: trans("usersFeatures.2.title"),
          description: trans("usersFeatures.2.description")
        }]}
      />

      <LandingSection
        id="innovative"
        title={trans("innovative")}
        description={trans("innovativeDescription")}
        features={[{
          icon: require("@images/svg/feature-decentralized.svg"),
          title: trans("innovativeFeatures.0.title"),
          description: trans("innovativeFeatures.0.description")
        }, {
          icon: require("@images/svg/feature-encrypted.svg"),
          title: trans("innovativeFeatures.1.title"),
          description: trans("innovativeFeatures.1.description")
        }]}
      />

      <LandingSection
        id="extendable"
        title={trans("extendable")}
        description={trans("extendableDescription")}
        features={[{
          icon: require("@images/svg/feature-index.svg"),
          title: trans("extendableFeatures.0.title"),
          description: trans("extendableFeatures.0.description")
        }, {
          icon: require("@images/svg/feature-gateway.svg"),
          title: trans("extendableFeatures.1.title"),
          description: trans("extendableFeatures.1.description")
        }]}
      />

      <section className="social mb-16">
        <div className="container">
          <div className="row">
            <div className="col">
              <Card className="">
                <div className="container">
                  <div className="row py-4 px-4 md:px-8">
                    <div className="col sm:w-1/3">
                      <h4 className="text-4xl leading-tight font-extrabold text-gray-700 text-center sm:text-left">
                        {trans("contact")}
                      </h4>
                    </div>
                    <div className="col w-auto mx-auto">
                      <p className="text-gray-600 mb-6">{trans("followUs")}</p>
                      <SocialMenu vertical={true} buttonStyle={true} />
                    </div>
                  </div>
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
