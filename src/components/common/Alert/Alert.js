import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import "./alert.scss"

const Alert = ({ children, className, type, title, onClose }) => {
  return (
    <div
      className={classnames("alert", className, {
        [`alert-${type}`]: type,
      })}
    >
      <div className="alert-header">
        {title && (
          <div className="alert-title">{title}</div>
        )}

        {onClose && (
          <button className="close" onClick={onClose}>
            <span className="m-auto" aria-hidden="true">
              &times;
            </span>
          </button>
        )}
      </div>
      <span>{children}</span>
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
}

Alert.defaultProps = {
  type: "success",
}

export default Alert
