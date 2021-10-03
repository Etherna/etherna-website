import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import moment from "moment"
import "moment/locale/it"

import Avatar from "@components/common/Avatar"
import { useLocale } from "@utils/localizedPage"
import routes from "@utils/routes"

import "./post-preview.scss"

/**
 * @typedef {object} BlogPostPreviewProps
 * @property {import("@utils/dataParser").Post} post
 *
 * @param {BlogPostPreviewProps} param0
 */
const BlogPostPreview = ({ post }) => {
  const [locale] = useLocale()
  const formattedDate = moment(post.published_on).locale(locale)

  return (
    <article className="post-preview">
      <div className="post-preview-details">
        <header className="post-preview-header">
          {post.category && (
            <Link to={routes.blogCategoryPath(post.category.slug, locale)}>
              <div className="post-category">
                {post.category.name}
              </div>
            </Link>
          )}
        </header>

        <Link to={routes.blogPostPath(post.slug, post.locale)}>
          <h2 className="post-preview-title">{post.title}</h2>
          <p className="post-preview-excerpt">{post.excerpt}</p>
        </Link>

        <footer className="post-preview-meta">
          <Avatar id={post.author.avatar} />
          <h4 className="author-name">
            {post.author.first_name} {post.author.last_name}
          </h4>
          <span className="publish-time">
            {formattedDate.format("LL")}
          </span>
        </footer>
      </div>
      <div className="post-preview-image">
        {post.image && (
          <Link to={routes.blogPostPath(post.slug, post.locale)}>
            <GatsbyImage image={post.image} objectFit="cover" objectPosition="50% 50%" />
          </Link>
        )}
      </div>
    </article>
  );
}

BlogPostPreview.propTypes = {
  post: PropTypes.object.isRequired,
}

export default BlogPostPreview
