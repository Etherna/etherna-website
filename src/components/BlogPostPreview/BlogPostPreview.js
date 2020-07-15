import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { Link } from "gatsby"
import moment from "moment"
import "moment/locale/en-gb"
import "moment/locale/it"

import Routes from "@utils/routes"
import Avatar from "@components/common/Avatar"
import { useLocale } from "@utils/localizedPage"

import "./post-preview.scss"

const BlogPostPreview = ({ post }) => {
  const [locale] = useLocale()
  const formattedDate = moment(post.published_on).locale(locale)

  return (
    <article className="post-preview">
      <div className="post-preview-details">
        <header className="post-preview-header">
          {post.category && (
            <Link to={Routes.blogCategoryPath(post.category.slug, locale)}>
              <div className="post-category">
                {post.category.name}
              </div>
            </Link>
          )}
        </header>

        <Link to={Routes.blogPostPath(post.slug)}>
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
        <Link to={Routes.blogPostPath(post.slug)}>
          <Img
            fluid={post.image}
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </Link>
      </div>
    </article>
  )
}

BlogPostPreview.propTypes = {
  post: PropTypes.object.isRequired,
}

export default BlogPostPreview
