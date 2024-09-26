import { cn } from "@/utils/classnames"

function BlogPosts({ className, children, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "container my-24 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  )
}

function BlogPostsItem({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li className={cn("text-lg", className)} {...props}>
      {children}
    </li>
  )
}

function BlogPostsLink({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a className={cn("text-lg", className)} {...props}>
      {children}
    </a>
  )
}

function BlogPostsThumbnail({ className, src, alt, ...props }: React.ComponentProps<"img">) {
  return (
    <img className={cn("h-64 w-full object-cover", className)} src={src} alt={alt} {...props} />
  )
}

function BlogPostTitle({ className, children, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn("text-2xl font-bold", className)} {...props}>
      {children}
    </h2>
  )
}

function BlogPostDate({ className, children, ...props }: React.ComponentProps<"time">) {
  return (
    <time className={cn("text-sm", className)} {...props}>
      {children}
    </time>
  )
}

export { BlogPosts, BlogPostsItem, BlogPostsLink, BlogPostsThumbnail, BlogPostTitle, BlogPostDate }
