import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import "./button.scss"

const Button = ({
  children,
  className,
  type,
  disabled,
  submit,
  onClick
}) => {
  return (
    <button
      className={classnames(
        className,
        "btn", {
          [`btn-${type}`]: type != null
        }
      )}
      type={submit ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary", "danger", "warning", "info"]),
  disabled: PropTypes.bool,
  submit: PropTypes.bool,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  disabled: false,
  submit: false
}

export default Button
