import React, { useRef } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import ViewportObserver from "@components/ViewportObserver"

const LandingSection = ({
  id,
  title,
  description,
  features
}) => {
  const titleRef = useRef()
  const descriptionRef = useRef()

  return (
    <section id={id} className="landing-section">
      <div className="container">
        <div className="row">
          <div className="col">
            <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
              <h2 className="landing-title fade-in-up delay-50" ref={titleRef}>{title}</h2>
            </ViewportObserver>
            <ViewportObserver childrenRef={descriptionRef} viewportClassName="animation-active">
              <p className="landing-description fade-in-up delay-100" ref={descriptionRef}>{description}</p>
            </ViewportObserver>
          </div>
          {features.map((feature, i) => (
            <Feature feature={feature} count={features.length} key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const Feature = ({ feature, count }) => {
  const iconRef= useRef()
  const titleRef= useRef()
  const descrpitionRef= useRef()

  return (
    <div className={classnames("col", {
      // fix purge css
      "sm:w-1/2": count === 2,
      "sm:w-1/3": count === 3,
    })}>
      <div className="landing-feature">
        <ViewportObserver childrenRef={iconRef} viewportClassName="animation-active">
          <div className="feature-icon fade-in-up delay-150" ref={iconRef}>
            <img src={feature.icon} alt={feature.title} />
          </div>
        </ViewportObserver>
        <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
          <h3 className="feature-title fade-in-up delay-200" ref={titleRef}>
            {feature.title}
          </h3>
        </ViewportObserver>
        <ViewportObserver childrenRef={descrpitionRef} viewportClassName="animation-active" offset={50}>
          <p className="feature-description fade-in-up delay-300" ref={descrpitionRef}>
            {feature.description}
          </p>
        </ViewportObserver>
      </div>
    </div>
  )
}

LandingSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default LandingSection
