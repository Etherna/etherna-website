import Col from "@/components/common/Col"
import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type BlogPostSidebarProps = PropsWithChildren<{
  className?: string
  position?: "left" | "right"
}>

const BlogPostSidebar: React.FC<BlogPostSidebarProps> = ({ children, className, position }) => {
  return (
    <Col
      as="aside"
      className={classNames(
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

export default BlogPostSidebar
