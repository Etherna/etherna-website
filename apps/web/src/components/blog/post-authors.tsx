import { cn } from "@/utils/classnames"

import type { BundledImage } from "@/utils/bundle"

function PostAuthors({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul className={cn("flex", className)} {...props}>
      {children}
    </ul>
  )
}

function PostAuthorsItem({
  className,
  name,
  avatar,
  role,
  ...props
}: Omit<React.ComponentProps<"li">, "role"> & {
  name: string
  role: string | null | undefined
  avatar?: BundledImage
}) {
  return (
    <li className={cn("text-sm", className)} {...props}>
      {/* todo */}
    </li>
  )
}

export { PostAuthors, PostAuthorsItem }
