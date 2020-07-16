import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import { graphql, useStaticQuery, Link } from "gatsby"

import { parseCategories } from "@utils/dataParser"
import { useLocale } from "@utils/localizedPage"

import "./blog-header.scss"
import routes from "@utils/routes"

const BlogHeader = ({ title, activeSlug }) => {
  const data = useStaticQuery(graphql`
    query {
      categories:allDirectusCategory {
        nodes {
          localized_contents {
            slug
            name
            locale
          }
        }
      }
    }
  `)
  const [locale] = useLocale()
  const categories = parseCategories(data.categories.nodes, locale)

  return (
    <header className="blog-header">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="blog-header-title">{title}</h1>

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
