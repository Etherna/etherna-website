import React, { useEffect } from "react"

import BlogPosts from "./BlogPosts"
import HeadMeta from "@components/layout/HeadMeta"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Category, Post } from "@definitions/app"
import routes from "@utils/routes"

type BlogCategoryProps = {
  category: Category
  posts: Post[]
}

const BlogCategory: React.FC<BlogCategoryProps> = ({ category, posts }) => {
  const [locale, { setLocalePath }] = useLocale()

  useEffect(() => {
    setLocalePaths()
    return () => clearLocalePaths()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocalePaths = () => {
    category.allSlugs.forEach(info => {
      setLocalePath(info.locale, routes.blogCategoryPath(info.slug, info.locale))
    })
  }

  const clearLocalePaths = () => {
    category.allSlugs.forEach(info => {
      setLocalePath(info.locale, undefined)
    })
  }

  return (
    <>
      <HeadMeta title={category.name} />

      <BlogPosts
        title={`Blog: ${category.name}`}
        posts={posts}
        activeSlug={category.slug}
        breadcrumb={[{
          title: "Etherna",
          path: routes.homePath(locale)
        }, {
          title: "Blog",
          path: routes.blogPath(locale)
        }, {
          title: category.name
        }]}
      />
    </>
  )
}

export default BlogCategory
