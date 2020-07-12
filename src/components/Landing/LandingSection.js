import React from "react"
import PropTypes from "prop-types"

const LandingSection = ({
  id,
  title,
  description,
  features
}) => {
  return (
    <section id={id} className="landing-section">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="landing-title">{title}</h2>
            <p className="landing-description">{description}</p>
          </div>
          {features.map((feature, i) => (
            <div className={`col sm:w-1/${features.length}`} key={i}>
              <div className="landing-feature">
                <div className="feature-icon">
                  <img src={feature.icon} alt={feature.title} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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