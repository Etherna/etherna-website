import { ClockIcon } from "lucide-react"

import { FacebookLogo, LinkedInLogo, XLogo } from "../assets/brand"
import { Image } from "../common/image"
import { LocaleFlag } from "../common/locale-flag"
import { Button } from "../ui/button"
import { t } from "@/i18n"
import { blogDictionary } from "@/i18n/dictionaries/blog"
import { langsDictionary } from "@/i18n/dictionaries/langs"
import { cn } from "@/lib/utils"
import { $locale } from "@/stores/locale-store"

import type { ImageProps } from "../common/image"
import type { Locale, LocalizedPath } from "@/i18n/types"

function Post({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("container my-32 flex max-w-prose flex-col items-center gap-10", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function PostContent({ className, children, ...props }: React.ComponentProps<"article">) {
  return (
    <article className={cn("prose my-12 lg:prose-lg", className)} {...props}>
      {children}
    </article>
  )
}

function PostTitle({ className, children, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-center text-3xl/tight font-bold sm:text-4xl/tight lg:text-5xl/tight",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

function PostMetas({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex grow items-center justify-between gap-4 self-stretch text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function PostMinutesRead({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm", className)} {...props}>
      <ClockIcon className="mr-1 inline size-3.5" />
      {children}
    </p>
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
  return (
    <Image
      className={cn("overflow-hidden rounded-2xl border border-muted lg:max-w-[120%]", className)}
      {...props}
    />
  )
}

function PostLocaleSwitcher({
  className,
  locale,
  localizedPaths,
  ...props
}: React.ComponentProps<"div"> & { locale: Locale; localizedPaths: LocalizedPath[] }) {
  const otherLocales = localizedPaths.filter((path) => path.locale !== locale)

  if (otherLocales.length === 0) {
    return null
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)} {...props}>
      <p className="text-sm text-muted-foreground">
        {t(blogDictionary.alsoAvailableIn, { locale })}
      </p>
      <div className="flex flex-wrap items-center justify-around gap-2">
        {otherLocales.map((path) => (
          <Button key={path.locale} className="items-center gap-2" variant={"outline"} asChild>
            <a href={path.path}>
              <LocaleFlag className="size-4" locale={path.locale} />
              <span>
                {t(blogDictionary.readIn, {
                  locale: path.locale,
                  params: {
                    locale: t(langsDictionary[path.locale], { locale: path.locale }),
                  },
                })}
              </span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  )
}

function PostShare({
  className,
  href,
  title,
  ...props
}: React.ComponentProps<"div"> & { href: string; title: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-8", className)} {...props}>
      <p className="text-sm text-muted-foreground">Share this post</p>
      <div className="flex items-center gap-6 [&_svg]:size-6">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${href}&t=${encodeURIComponent(title)}`}
          className=""
          target="_blank"
          rel="noreferrer noopener"
        >
          <FacebookLogo className="text-muted-foreground/80 transition-colors duration-300 hover:text-foreground" />
        </a>
        <a
          href={`https://twitter.com/share?url=${href}&text=${encodeURIComponent(title)}`}
          className=""
          target="_blank"
          rel="noreferrer noopener"
        >
          <XLogo className="text-muted-foreground/80 transition-colors duration-300 hover:text-foreground" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${href}`}
          className=""
          target="_blank"
          rel="noreferrer noopener"
        >
          <LinkedInLogo className="text-muted-foreground/80 transition-colors duration-300 hover:text-foreground" />
        </a>
      </div>
    </div>
  )
}

export {
  Post,
  PostContent,
  PostTitle,
  PostMetas,
  PostMinutesRead,
  PostDate,
  PostThumbnail,
  PostLocaleSwitcher,
  PostShare,
}
