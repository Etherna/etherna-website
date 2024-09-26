import { Image } from "../common/image"
import { cn } from "@/utils/classnames"

import type { ImageProps } from "../common/image"

function Post({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("container flex flex-col gap-6", className)} {...props}>
      {children}
    </div>
  )
}

function PostContent({ className, children, ...props }: React.ComponentProps<"article">) {
  return (
    <article className={cn("prose lg:prose-lg", className)} {...props}>
      {children}
    </article>
  )
}

function PostTitle({ className, children, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1 className={cn("text-4xl/tight font-bold", className)} {...props}>
      {children}
    </h1>
  )
}

function PostDate({ className, children, ...props }: React.ComponentProps<"time">) {
  return (
    <time className={cn("text-sm", className)} {...props}>
      {children}
    </time>
  )
}

function PostThumbnail({ className, ...props }: ImageProps) {
  return <Image className={cn("", className)} {...props} />
}

function PostShare({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      <p>Share this post</p>
      <div>{children}</div>
    </div>
  )
}

export { Post, PostContent, PostTitle, PostDate, PostThumbnail, PostShare }
