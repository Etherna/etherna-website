import { Fragment } from "react"
import { useTranslation } from "react-i18next"

import BlogPostSidebar from "./BlogPostSidebar"
import ShareButtons from "./ShareButtons"
import Image from "@/components/common/Image"
import classNames from "@/utils/classnames"
import { localeInfo } from "@/utils/lang"
import routes from "@/utils/routes"

import type { Post } from "@/schema/app"
import type { Lang } from "@/utils/lang"

type BlogPostSidebarLeftProps = {
  post: Post
  lang: Lang
}

const BlogPostSidebarLeft: React.FC<BlogPostSidebarLeftProps> = ({ post }) => {
  const { t } = useTranslation("blog")
  const otherLangs = post.allSlugs.filter(s => s.locale !== post.locale)

  return (
    <BlogPostSidebar position="left" className="mt-16 lg:mt-0">
      {otherLangs.length > 0 && <h6 className="mb-4 mt-0">{t("moreLanguages")}</h6>}
      {otherLangs.map((slugInfo, i) => (
        <Fragment key={i}>
          <a
            href={routes.blogPostPath(slugInfo.slug, slugInfo.locale)}
            className={classNames(
              "inline-flex items-center rounded px-3 py-2 text-xs text-gray-600",
              "border border-gray-400 hover:border-blue-500 hover:bg-gray-200",
              "transition-colors duration-500"
            )}
          >
            <div className="mr-2 h-5 w-5 overflow-hidden rounded-full">
              <Image data={localeInfo(slugInfo.locale)?.flag} />
            </div>
            <span className="leading-none">
              {t("readIn", { lng: slugInfo.locale })} {localeInfo(slugInfo.locale)?.name}
            </span>
          </a>

          <hr className="my-8" />
        </Fragment>
      ))}

      <h6 className="mb-4 mt-0">{t`sharePost`}</h6>
      <ShareButtons
        className="mb-16"
        url={routes.blogPostPath(post.slug, post.locale)}
        title={post.title}
        vertical={true}
      />
    </BlogPostSidebar>
  )
}

export default BlogPostSidebarLeft
