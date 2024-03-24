import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

interface ColProps extends PropsWithChildren {
  as?: React.ElementType
  className?: string
}

export function Col({ children, as: As = "div", className }: ColProps) {
  return <As className={cn("px-5", "w-full", className)}>{children}</As>
}
