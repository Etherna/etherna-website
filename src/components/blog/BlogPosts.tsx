import React from "react"

import classes from "@styles/components/blog/BlogPosts.module.scss"

import BlogPostPreview from "./BlogPostPreview"
import BlogHeader from "./BlogHeader"
import Breadcrumb from "@components/common/Breadcrumb"
import BreadcrumbItem from "@components/common/BreadcrumbItem"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Post } from "@definitions/app"
import { useTranslations } from "@hooks/useTranslations"

type BlogPostsProps = {
  title: string
  posts: Post[]
  activeSlug?: string
  breadcrumb: Array<{
    title: string
    path: string
  }>
}

const BlogPosts: React.FC<BlogPostsProps> = ({ title, posts, activeSlug, breadcrumb }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "blog")

  return (
    <>
      <BlogHeader
        title={title}
        activeSlug={activeSlug}
      />

      <section className={classes.blog}>
        <div className="container">
          <div className="row">
            <div className="col">
              {breadcrumb && (
                <Breadcrumb>
                  {breadcrumb.map((brItem, i) => (
                    <BreadcrumbItem
                      title={brItem.title}
                      path={brItem.path}
                      key={i}
                    />
                  ))}
                </Breadcrumb>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col lg:w-3/4 xl:w-2/3">
              {posts.map((post, i) => (
                <BlogPostPreview
                  post={post}
                  key={i}
                />
              ))}

              {posts.length === 0 && (
                <div className="py-8 text-gray-700">
                  <h4>{t`noPosts`} <span role="img" aria-label="silence">🤫</span></h4>
                </div>
              )}
            </div>
            <aside className="col lg:w-1/4 xl:w-1/3">
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogPosts
