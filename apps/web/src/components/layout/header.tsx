import React from "react"

import { cn } from "@/utils/classnames"

interface HeaderProps extends React.ComponentProps<"header"> {}

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header className={cn("", className)} {...props}>
      <nav></nav>
    </header>
  )
}
