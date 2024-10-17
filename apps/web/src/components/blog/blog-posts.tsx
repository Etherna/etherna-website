import { useStore } from "@nanostores/react"

import { Button } from "../ui/button"
import { t } from "@/i18n"
import { blogDictionary } from "@/i18n/dictionaries/blog"
import { cn } from "@/lib/utils"
import { $locale } from "@/stores/locale-store"

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

function BlogPostsPagination({
  className,
  totalDocs,
  totalPages,
  page,
  ...props
}: React.ComponentProps<"nav"> & {
  totalDocs: number
  totalPages: number
  page: number
}) {
  const locale = useStore($locale) ?? "en"

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className={cn("flex justify-center gap-4 text-sm", className)} {...props}>
      {page > 1 && (
        <Button variant={"ghost"} size="lg" asChild>
          <a href={`/blog/page/${page - 1}`} className="">
            ← {t(blogDictionary.previous, { locale })}
          </a>
        </Button>
      )}

      <span className="">{t(blogDictionary.pageOf, { locale, page, totalPages })}</span>

      {page < totalPages && (
        <Button variant={"ghost"} size="lg" asChild>
          <a href={`/blog/page/${page + 1}`} className="">
            {t(blogDictionary.next, { locale })} →
          </a>
        </Button>
      )}
    </nav>
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

export {
  BlogPosts,
  BlogPostsItem,
  BlogPostsLink,
  BlogPostsThumbnail,
  BlogPostTitle,
  BlogPostDate,
  BlogPostsPagination,
}
