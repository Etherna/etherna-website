import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"

import { parseCategories } from "@utils/dataParser"
import { useLocale } from "@utils/localizedPage"

import "./blog-header.scss"

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
                  className={classnames("blog-categories-item", {
                    "active": category.slug === activeSlug
                  })}
                  key={i}
                >
                  {category.name}
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
