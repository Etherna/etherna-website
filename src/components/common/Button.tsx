import React from "react"
import classNames from "classnames"

import classes from "@styles/components/common/Button.module.scss"

type ButtonProps = {
  className?: string
  type?: "primary" | "secondary" | "danger" | "warning" | "info"
  disabled?: boolean
  submit?: boolean
  onClick?(): void
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  disabled,
  submit,
  onClick
}) => {
  return (
    <button
      className={classNames(
        className,
        classes.btn,
        {
          [classes.btnPrimary]: type === "primary",
          [classes.btnSecondary]: type === "secondary",
          [classes.btnDanger]: type === "danger",
          [classes.btnWarning]: type === "warning",
          [classes.btnInfo]: type === "info",
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

export default Button
