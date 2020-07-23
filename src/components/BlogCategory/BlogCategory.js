import React, { useEffect } from "react"
import PropTypes from "prop-types"

import SEO from "@components/SEO"
import BlogPosts from "@components/BlogPosts"
import { useLocale } from "@utils/localizedPage"
import routes from "@utils/routes"

/**
 * @typedef BlogCategoryProps
 * @property {import("@utils/dataParser").Category} category
 * @property {import("@utils/dataParser").Post[]} posts
 *
 * @param {BlogCategoryProps} param0
 */
const BlogCategory = ({ category, posts }) => {
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
      <SEO title={category.name} />

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

BlogCategory.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    allSlugs: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        locale: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
}

export default BlogCategory
