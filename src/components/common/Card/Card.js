import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

import "./card.scss"

const Card = ({ children, className, size }) => {
  return (
    <div className={classnames("card", className, {
      [`card-${size}`]: !!size
    })}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string,
}

export default Card
