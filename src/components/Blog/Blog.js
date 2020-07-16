import React, { useEffect } from "react"
import PropTypes from "prop-types"

import BlogPosts from "@components/BlogPosts"
import routes from "@utils/routes"
import { useLocale } from "@utils/localizedPage"
import useLocaleInfo from "@utils/useLocaleInfo"

/**
 * @typedef BlogPostsProp
 * @property {import("@utils/dataParser").Post[]} posts
 *
 * @param {BlogPostsProp} param0
 */
const Blog = ({ posts }) => {
  const [locale, { setLocalePath }] = useLocale()
  const [,locales] = useLocaleInfo()

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

Blog.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      locale: PropTypes.string.isRequired,
      published_on: PropTypes.string.isRequired,
      updated_on: PropTypes.string,
      image: PropTypes.object,
      category: PropTypes.object,
      author: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        avatar: PropTypes.number,
      }).isRequired,
      allSlugs: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          locale: PropTypes.string.isRequired,
        }),
      ).isRequired,
    })
  ).isRequired,
  locale: PropTypes.string.isRequired,
}

export default Blog
