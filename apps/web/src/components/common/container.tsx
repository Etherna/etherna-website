import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

interface ContainerProps extends PropsWithChildren {
  className?: string
  fluid?: boolean
  larger?: boolean
}

export function Container({ children, fluid, larger, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5",
        {
          "sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg": !fluid,
          "xl:max-w-screen-xl": !fluid && larger,
        },
        className
      )}
    >
      {children}
    </div>
  )
}
