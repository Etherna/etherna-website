import React from "react"

import ArrowDown from "!svg-react-loader!@images/svg/arrow-down.svg"

import "./hero.scss"

const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <h1 className="hero-title">
          Let’s stop <span className="text-accent">Video Censorship</span> <br/>
          together!
        </h1>

        <p className="hero-description">
          Etherna is a <strong>transparent video platform</strong> where <br/>
          freedom of speech is incentivized, not convicted.
        </p>

        <h3 className="hero-tagline">The Revolution Begins Here!</h3>

        <div>
          <a href="#transparency" className="hero-cta">
            <ArrowDown />
            Learn more
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero