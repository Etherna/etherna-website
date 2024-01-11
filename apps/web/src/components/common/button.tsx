import React, { forwardRef } from "react"

import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type ButtonProps = PropsWithChildren<{
  className?: string
  type?: "primary" | "secondary" | "danger" | "warning" | "info"
  href?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
  disabled?: boolean
  large?: boolean
  submit?: boolean
  onClick?: () => void
}>

export const Button = forwardRef<HTMLElement, ButtonProps>(
  ({ children, className, href, target, type, large, disabled, submit, onClick }, ref) => {
    const btnClassName = cn(
      "inline-flex items-center px-5 py-2 rounded-lg bg-gray-200 transition-colors duration-500",
      "text-gray-700 text-sm hover:text-white font-semibold text-center",
      "disabled:cursor-not-allowed disabled:opacity-50",
      {
        "bg-primary-500 text-white hover:bg-primary-300": type === "primary",
        "bg-gray-600 text-white hover:bg-opacity-75": type === "secondary",
        "bg-red-500 text-white hover:bg-opacity-75": type === "danger",
        "bg-yellow-500 text-white hover:bg-opacity-75": type === "warning",
        "bg-blue-400 text-white hover:bg-opacity-75": type === "info",
        "text-base px-6 py-3 [&_svg]:w-[1.2em] [&_svg]:h-[1.2em] [&_svg]:mr-2": large,
      },
      className
    )

    if (href) {
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={btnClassName}
          href={href}
          target={target}
          onClick={onClick}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={btnClassName}
        type={submit ? "submit" : "button"}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
