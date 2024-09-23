import React from "react"

import { cn } from "@/utils/classnames"

interface FooterProps extends React.ComponentProps<"footer"> {}

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer className={cn("", className)} {...props}>
      <nav></nav>
    </footer>
  )
}
