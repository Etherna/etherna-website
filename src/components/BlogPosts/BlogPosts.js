import React from "react"
import PropTypes from "prop-types"

import BlogPostPreview from "@components/BlogPostPreview"
import BlogHeader from "@components/BlogHeader"
import { Breadcrumb, BreadcrumbItem } from "@components/common/Breadcrumb"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

import "./blog.scss"

/**
 * @typedef BreadcrumbItem
 * @property {string} title
 * @property {string} path
 *
 * @typedef BlogPostsProp
 * @property {string} title
 * @property {import("@utils/dataParser").Post[]} posts
 * @property {BreadcrumbItem[]} breadcrumb
 *
 * @param {BlogPostsProp} param0
 */
const BlogPosts = ({ title, posts, activeSlug, breadcrumb }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "blog")

  return (
    <>
      <BlogHeader
        title={title}
        activeSlug={activeSlug}
      />

      <section className="blog">
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
                  <h4>{trans("noPosts")} <span role="img" aria-label="silence">🤫</span></h4>
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

BlogPosts.propTypes = {
  title: PropTypes.string.isRequired,
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
  activeSlug: PropTypes.string,
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string,
    }),
  ),
}

export default BlogPosts
