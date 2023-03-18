import CategoryBadge from "./CategoryBadge"
import Avatar from "@/components/common/Avatar"
import Image from "@/components/common/Image"
import classNames from "@/utils/classnames"
import dayjs from "@/utils/dayjs"
import routes from "@/utils/routes"

import type { Post } from "@/schema/app"
import type { Lang } from "@/utils/lang"

type BlogPostPreviewProps = {
  post: Omit<Post, "content" | "meta_description" | "meta_keywords">
  featured?: boolean
  lang: Lang
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ post, featured, lang }) => {
  const formattedDate = dayjs(post.updated_on || post.published_on).locale(lang)

  return (
    <article
      className={classNames("flex items-center py-4 lg:py-8", {
        "items-start": featured,
      })}
    >
      <div
        className={classNames("w-4/5 pr-2 lg:w-3/4 lg:pr-8", {
          "order-2 w-2/3 pl-2 pr-0 lg:w-1/2 lg:pl-8 lg:pr-0": featured,
        })}
      >
        <header className="w-full">
          {post.category && <CategoryBadge category={post.category} lang={lang} />}
        </header>

        <a href={routes.blogPostPath(post.slug, post.locale)}>
          <h2 className="mb-2 font-serif leading-none text-gray-900">{post.title}</h2>
          <p className="truncate text-gray-600 sm:whitespace-normal sm:break-words">
            {post.excerpt}
          </p>
        </a>

        <footer
          className={classNames("mt-4 flex items-center text-sm text-gray-600", {
            "flex-wrap sm:flex-nowrap": featured,
          })}
        >
          {post.author.avatar && <Avatar src={post.author.avatar} className="h-6 w-6" />}
          <h4 className="mb-0 ml-2 text-sm text-gray-600">
            {post.author.first_name} {post.author.last_name}
          </h4>
          <span
            className={classNames("text-xs before:mx-3 before:content-['-']", {
              "before:invisible sm:before:visible": featured,
            })}
          >
            {formattedDate.format("LL")}
          </span>
        </footer>
      </div>
      <div
        className={classNames("w-1/5 lg:w-1/4", {
          "order-1 w-1/3 lg:w-1/2": featured,
        })}
      >
        {post.image && (
          <a href={routes.blogPostPath(post.slug, post.locale)}>
            <Image data={post.image} className="object-cover" />
          </a>
        )}
      </div>
    </article>
  )
}

export default BlogPostPreview
