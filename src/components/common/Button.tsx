import React, { forwardRef } from "react"
import classNames from "@utils/classnames"

import classes from "@styles/components/common/Button.module.scss"
import { Link } from "gatsby"

type ButtonProps = {
  children?: React.ReactNode
  className?: string
  type?: "primary" | "secondary" | "danger" | "warning" | "info"
  href?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
  disabled?: boolean
  large?: boolean
  submit?: boolean
  onClick?(): void
}

const Button = forwardRef<HTMLElement, ButtonProps>(({
  children,
  className,
  href,
  target,
  type,
  large,
  disabled,
  submit,
  onClick
}, ref) => {
  const btnClassName = classNames(
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
  )

  if (href && href.startsWith("http")) {
    return (
      <a
        className={btnClassName}
        href={href}
        target={target}
        onClick={onClick}
        ref={ref as any}
      >
        {children}
      </a>
    )
  }
  if (href && !href.startsWith("http")) {
    return (
      <Link
        className={btnClassName}
        to={href}
        target={target}
        onClick={onClick}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={btnClassName}
      type={submit ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
      ref={ref as any}
    >
      {children}
    </button>
  )
})

export default Button
