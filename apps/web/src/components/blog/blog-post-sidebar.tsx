import { Col } from "@/components/common/col"
import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

interface BlogPostSidebarProps extends PropsWithChildren {
  className?: string
  position?: "left" | "right"
}

export function BlogPostSidebar({ children, className, position }: BlogPostSidebarProps) {
  return (
    <Col
      as="aside"
      className={cn(
        "mx-auto w-full md:max-w-prose lg:max-w-52 lg:flex-1 lg:px-4 lg:pt-16",
        {
          "order-1": position === "left",
          "order-3": position === "right",
        },
        className
      )}
    >
      {children}
    </Col>
  )
}
