import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

interface InputGroupProps extends PropsWithChildren {
  className?: string
}

export function InputGroup({ children, className }: InputGroupProps): JSX.Element {
  return <div className={cn("mb-6 flex flex-col", className)}>{children}</div>
}
