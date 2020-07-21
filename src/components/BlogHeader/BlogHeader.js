import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import moment from "moment"
import { graphql, useStaticQuery, Link } from "gatsby"

import { parseCategories } from "@utils/dataParser"
import { useLocale } from "@utils/localizedPage"

import "./blog-header.scss"
import routes from "@utils/routes"

const BlogHeader = ({ title, activeSlug }) => {
  const data = useStaticQuery(graphql`
    query {
      categories: allDirectusCategory(
        filter: {posts: {elemMatch: {published_on: {ne: null}}}}
      ) {
        nodes {
          localized_contents {
            slug
            name
            locale
          }
          posts {
            published_on
          }
        }
      }
    }
  `)
  const [locale] = useLocale()
  const nodes = data.categories.nodes.filter(n =>
    n.posts.filter(p => moment(p.published_on).isBefore(moment())).length > 0
  )
  const categories = parseCategories(nodes, locale)

  return (
    <header className="blog-header">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="blog-header-title">{title}</h1>

            {categories.length > 0 && (
              <ul className="blog-categories">
                {categories.map((category, i) => (
                  <li
                    className="blog-categories-item"
                    key={i}
                  >
                    <Link
                      to={routes.blogCategoryPath(category.slug, category.locale)}
                      className={classnames("blog-categories-link", {
                        "active": category.slug === activeSlug
                      })}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

BlogHeader.propTypes = {
  title: PropTypes.string.isRequired,
  activeSlug: PropTypes.string,
}

export default BlogHeader
