import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

interface CardProps extends PropsWithChildren {
  className?: string
  size?: "large"
}

export function Card({ children, className, size }: CardProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl rounded-xl bg-white p-6",
        {
          "max-w-5xl": size === "large",
        },
        className
      )}
    >
      {children}
    </div>
  )
}
