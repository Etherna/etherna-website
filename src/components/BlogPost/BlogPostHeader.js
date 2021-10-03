import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import moment from "moment"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { useLocale } from "@utils/localizedPage"
import Avatar from "@components/common/Avatar"
import { Breadcrumb, BreadcrumbItem } from "@components/common/Breadcrumb"
import { useTranslations } from "@utils/useTranslations"
import routes from "@utils/routes"

/**
 * @typedef {object} BlogPostHeaderProps
 * @property {import("@utils/dataParser").AuthorNode} author
 * @property {string} postTitle
 * @property {import("@utils/dataParser").FluidImage} image
 * @property {string} published
 * @property {string} updated
 * @property {import("@utils/dataParser").Category} category
 *
 * @param {BlogPostHeaderProps} param0
 */
const BlogPostHeader = ({ author, postTitle, image, published, updated, category }) => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "blog")
  const publishedDate = moment(published).locale(locale)
  const updatedDate = updated ? moment(updated).locale(locale) : null

  return (
    <header className={classnames("post-header", {
      "post-header-hero": image != null
    })}>
      {image && (
        <div className="post-header-bg">
          <div
            className="post-header-bg-image"
            style={{ backgroundImage: `url(${image.base64})` }}
          />
        </div>
      )}

      <div className="post-header-nav">
        <div className="container">
          <div className="row">
            <div className="col">
              <Breadcrumb>
                <BreadcrumbItem title="Etherna" path={routes.homePath(locale)} />
                <BreadcrumbItem title="Blog" path={routes.blogPath(locale)} />
                {category && (
                  <BreadcrumbItem
                    title={category.name}
                    path={routes.blogCategoryPath(category.slug, locale)}
                  />
                )}
                <BreadcrumbItem title={postTitle} />
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>

      <div className="post-header-meta">
        <Avatar id={author.avatar} />
        <h4 className="author-name">{author.first_name} {author.last_name}</h4>

        <div className="publish-time">
          {publishedDate.format("LL")}

          {updatedDate && (
            <>
              <span> – </span>
              <span className="text-gray-800">{trans("updated")} {updatedDate.format("LL")}</span>
            </>
          )}
        </div>

        {category && (
          <Link to={routes.blogCategoryPath(category.slug, locale)}>
            <div className="post-category">
              {category.name}
            </div>
          </Link>
        )}

        <div className="thumbnail">
          {image && (
            <GatsbyImage image={image} objectFit="cover" objectPosition="50% 50%" />
          )}
        </div>
      </div>
    </header>
  );
}

BlogPostHeader.propTypes = {
  author: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    avatar: PropTypes.number,
  }).isRequired,
  postTitle: PropTypes.string.isRequired,
  image: PropTypes.object,
  published: PropTypes.string.isRequired,
  updated: PropTypes.string,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
  }),
}

export default BlogPostHeader
