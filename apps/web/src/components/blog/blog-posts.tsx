import React from "react"
import { useStore } from "@nanostores/react"

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Image } from "../common/image"
import { Button } from "../ui/button"
import { t } from "@/i18n"
import { blogDictionary } from "@/i18n/dictionaries/blog"
import { cn } from "@/lib/utils"
import { $locale } from "@/stores/locale-store"

function BlogPosts({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "container grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 md:grid-cols-3",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  )
}

function BlogPostsItem({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li className={cn("flex flex-col gap-3", className)} {...props}>
      {children}
    </li>
  )
}

function BlogPostsLink({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a className={cn("flex flex-col gap-3 text-lg", className)} {...props}>
      {children}
    </a>
  )
}

function BlogPostsThumbnail({ className, image, ...props }: React.ComponentProps<typeof Image>) {
  return image ? (
    <Image
      className={cn(
        "aspect-[16/10] w-full overflow-hidden rounded-lg border border-muted bg-muted object-cover",
        className,
      )}
      image={image}
      {...props}
    />
  ) : (
    <div className="flex aspect-[16/10] w-full flex-col items-center justify-center rounded-lg border border-muted bg-gradient-to-b from-muted to-muted/50">
      <span className="text-center text-4xl font-bold opacity-20 text-gradient">404</span>
      <span className="text-center text-sm text-muted-foreground opacity-30">
        thumbnail not found
      </span>
    </div>
  )
}

function BlogPostsTitle({ className, children, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn("text-xl/tight font-semibold", className)} {...props}>
      {children}
    </h2>
  )
}

function BlogPostsMetas({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs/tight text-muted-foreground",
        "[&>*:last-child]:after:hidden [&>*]:after:text-xl [&>*]:after:font-light [&>*]:after:text-muted-foreground/30 [&>*]:after:content-['/']",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function BlogPostsDate({ className, children, ...props }: React.ComponentProps<"time">) {
  return (
    <time className={cn("", className)} {...props}>
      {children}
    </time>
  )
}

function BlogPostsCategoryies({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul className={cn("flex flex-wrap items-start gap-1", className)} {...props}>
      {children}
    </ul>
  )
}

function BlogPostsCategory({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li className={cn("rounded-full bg-muted px-2 py-0.5 text-xs/tight", className)} {...props}>
      {children}
    </li>
  )
}

function BlogPostsPagination({
  className,
  basePath,
  totalPages,
  page,
  ...props
}: React.ComponentProps<"nav"> & {
  basePath: string
  totalDocs: number
  totalPages: number
  page: number
}) {
  const locale = useStore($locale) ?? "en"

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className={cn("flex items-center justify-center gap-4 text-sm", className)} {...props}>
      <Button
        className={cn({
          "pointer-events-none opacity-30": page === 1,
        })}
        variant={"ghost"}
        asChild
      >
        <a href={`${basePath}${page > 2 ? `/page/${page - 1}` : ""}`} className="">
          <ArrowLeftIcon className="mr-1.5 size-3" strokeWidth={2.5} />
          {t(blogDictionary.previous, { locale })}
        </a>
      </Button>

      <span className="text-muted-foreground">
        {t(blogDictionary.pageOf, { locale, params: { page, totalPages } })}
      </span>

      <Button
        className={cn({
          "pointer-events-none opacity-30": page === totalPages,
        })}
        variant={"ghost"}
        asChild
      >
        <a href={`${basePath}${`/page/${page + 1}`}`} className="">
          {t(blogDictionary.next, { locale })}
          <ArrowRightIcon className="ml-1.5 size-3" strokeWidth={2.5} />
        </a>
      </Button>
    </nav>
  )
}

export {
  BlogPosts,
  BlogPostsItem,
  BlogPostsLink,
  BlogPostsThumbnail,
  BlogPostsTitle,
  BlogPostsMetas,
  BlogPostsDate,
  BlogPostsCategoryies,
  BlogPostsCategory,
  BlogPostsPagination,
}
