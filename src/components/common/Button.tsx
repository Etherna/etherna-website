import React from "react"
import classNames from "classnames"

import classes from "@styles/components/common/Button.module.scss"

type ButtonProps = {
  children?: React.ReactNode
  className?: string
  type?: "primary" | "secondary" | "danger" | "warning" | "info"
  disabled?: boolean
  large?: boolean
  submit?: boolean
  onClick?(): void
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  large,
  disabled,
  submit,
  onClick
}) => {
  return (
    <button
      className={classNames(
        classes.btn,
        className,
        {
          [classes.btnPrimary]: type === "primary",
          [classes.btnSecondary]: type === "secondary",
          [classes.btnDanger]: type === "danger",
          [classes.btnWarning]: type === "warning",
          [classes.btnInfo]: type === "info",
          [classes.large]: large,
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
