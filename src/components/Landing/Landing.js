import React from "react"

import EthereumLogo from "!svg-react-loader!@images/logo-ethereum.svg"
import SwarmLogo from "!svg-react-loader!@images/logo-swarm.svg"
import ReactLogo from "!svg-react-loader!@images/logo-react.svg"
import Card from "@components/common/Card"

import "./landing.scss"
import LandingSection from "./LandingSection"
import SocialMenu from "@components/SocialMenu"

const Landing = () => {
  return (
    <>
      <section className="builtwith">
        <div className="container">
          <div className="row">
            <div className="col">
              <Card className="py-8">
                <div className="flex flex-col items-center">
                  <div className="text-label">Built With</div>
                  <div className="container mt-8">
                    <div className="row">
                      <div className="col sm:w-1/3">
                        <EthereumLogo />
                      </div>
                      <div className="col sm:w-1/3">
                        <SwarmLogo />
                      </div>
                      <div className="col sm:w-1/3">
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
        title="Transparency"
        description="Your channel, your narrative. We believe in freedom of speech."
        features={[{
          icon: require("@images/svg/feature-shadow-ban.svg"),
          title: `No shadow banning`,
          description: `Be free to post want you enjoy to do.
          We won’t ban any content as long as it’s legal.`
        }, {
          icon: require("@images/svg/feature-speech-freedom.svg"),
          title: `Freedom of Speech`,
          description: `Upload what you enjoy to do. No videos will be censored.
          Everyone should be entitled to its own idea.`
        }, {
          icon: require("@images/svg/feature-open-source.svg"),
          title: `Open Source`,
          description: `All codes of our platform will be published on GitHub,
          and will be available and visible to anyone.`
        }]}
      />

      <LandingSection
        id="users"
        title="For Creators and Users"
        description="Our vision is a future where the web is clear of invasive banners and where everyone supports content creators."
        features={[{
          icon: require("@images/svg/feature-creativity.svg"),
          title: `Creativity`,
          description: `Creators can express themself with no
          concerns about the future of their account.`
        }, {
          icon: require("@images/svg/feature-viewers.svg"),
          title: `Supported by Viewers`,
          description: `Paying a very small amount – based on the lot of time and quality of resources –
          we shall be able to sustain our project and creators too!`
        }, {
          icon: require("@images/svg/feature-revenue.svg"),
          title: `Scalable Revenue`,
          description: `We pay creators the same amount based on views.
          The more the users watch your contents, the more you will gain.`
        }]}
      />

      <LandingSection
        id="innovative"
        title="Innovative"
        description="We use the best and innovative technologies now on the market."
        features={[{
          icon: require("@images/svg/feature-decentralized.svg"),
          title: `Decentralized Content`,
          description: `Every assets on Etherna, from your avatar to your videos,
          are stored on a decentralized file system call Swarm.
          We can’t delete anything, you’ll be responsible for what you upload.`
        }, {
          icon: require("@images/svg/feature-encrypted.svg"),
          title: `Encrypted Videos`,
          description: `In order to preserve your privacy, videos are encrypted on Swarm.
          Etherna can store the encryption key so they can be managed easily.`
        }]}
      />

      <LandingSection
        id="extendable"
        title="Extendable"
        description="We provide an indexing protocol that everyone can modify and extend, so users can change the index to their favorite one and enjoy the content they like."
        features={[{
          icon: require("@images/svg/feature-index.svg"),
          title: `Custom Index`,
          description: `You can specify an index different from ours.
          That means everyone can build their own index and share it,
          making the users access completely different contents.`
        }, {
          icon: require("@images/svg/feature-gateway.svg"),
          title: `Custom Gateway`,
          description: `You can also specify a different Swarm Gateway to download assets and videos.`
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
                      <h4 className="text-4xl leading-tight font-extrabold text-gray-700">
                        Let's stay in touch!
                      </h4>
                    </div>
                    <div className="col w-auto mx-auto">
                      <p className="text-gray-600 mb-6">Follow us on our socials…</p>
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