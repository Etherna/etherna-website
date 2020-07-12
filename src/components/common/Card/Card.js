import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

import "./card.scss"

const Card = ({ children, className }) => {
  return (
    <div className={classnames("card", className)}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Card