import { CategoryBadge } from "./category-badge"
import { Avatar } from "@/components/common/avatar"
import { Image } from "@/components/common/image"
import { cn } from "@/utils/classnames"
import { localeToLang } from "@/utils/data-parser"
import { dayjs } from "@/utils/dayjs"
import { routes } from "@/utils/routes"

import type { ParsedPreviewPost } from "@/queries/fetch-blog-data"
import type { Lang } from "@/utils/lang"

interface BlogPostPreviewProps {
  post: ParsedPreviewPost
  featured?: boolean
  lang: Lang
}

export function BlogPostPreview({ post, featured, lang }: BlogPostPreviewProps) {
  const formattedDate = dayjs(post.editedAt || post.publishedAt).locale(lang)

  return (
    <article
      className={cn("flex items-center py-4 lg:py-8", {
        "items-start": featured,
      })}
    >
      <div
        className={cn("w-4/5 pr-2 lg:w-3/4 lg:pr-8", {
          "order-2 w-2/3 pl-2 pr-0 lg:w-1/2 lg:pl-8 lg:pr-0": featured,
        })}
      >
        <header className="w-full">
          {post.primaryCategory && <CategoryBadge category={post.primaryCategory} lang={lang} />}
        </header>

        <a href={routes.blogPostPath(post.slug, localeToLang(post.locale))}>
          <h2 className="mb-2 font-serif leading-none text-gray-900">{post.title}</h2>
          <p className="truncate text-gray-600 sm:whitespace-normal sm:break-words">
            {post.excerpt}
          </p>
        </a>

        <footer
          className={cn("mt-4 flex items-center text-sm text-gray-600", {
            "flex-wrap sm:flex-nowrap": featured,
          })}
        >
          {post.author.avatar && <Avatar src={post.author.avatar} className="h-6 w-6" />}
          <h4 className="mb-0 ml-2 text-sm text-gray-600">
            {post.author.firstName} {post.author.lastName}
          </h4>
          <span
            className={cn("text-xs before:mx-3 before:content-['-']", {
              "before:invisible sm:before:visible": featured,
            })}
          >
            {formattedDate.format("LL")}
          </span>
        </footer>
      </div>
      <div
        className={cn("w-1/5 lg:w-1/4", {
          "order-1 w-1/3 lg:w-1/2": featured,
        })}
      >
        {post.thumbnail && (
          <a href={routes.blogPostPath(post.slug, localeToLang(post.locale))}>
            <Image data={post.thumbnail} className="object-cover" />
          </a>
        )}
      </div>
    </article>
  )
}
