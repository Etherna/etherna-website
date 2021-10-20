import React, { useEffect } from "react"

import BlogPosts from "./BlogPosts"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Post } from "@definitions/app"
import useLocaleInfo from "@hooks/useLocaleInfo"
import routes from "@utils/routes"

type BlogProps = {
  posts: Post[]
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const [locale, { setLocalePath }] = useLocale()
  const [, locales] = useLocaleInfo()

  useEffect(() => {
    setLocalePaths()
    return () => clearLocalePaths()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocalePaths = () => {
    locales.forEach(info => {
      setLocalePath(info.code, routes.blogPath(info.code))
    })
  }

  const clearLocalePaths = () => {
    locales.forEach(info => {
      setLocalePath(info.code, undefined)
    })
  }

  return (
    <BlogPosts
      title="Blog"
      posts={posts}
      breadcrumb={[{
        title: "Etherna",
        path: routes.homePath(locale)
      }, {
        title: "Blog",
        path: routes.blogPath(locale)
      }]}
    />
  )
}

export default Blog
