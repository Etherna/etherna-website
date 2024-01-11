import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

interface RowProps extends PropsWithChildren {
  className?: string
  elRef?: React.RefObject<HTMLDivElement>
}

export function Row({ children, className, elRef }: RowProps) {
  return (
    <div ref={elRef} className={cn("-mx-5 flex flex-wrap", className)}>
      {children}
    </div>
  )
}
