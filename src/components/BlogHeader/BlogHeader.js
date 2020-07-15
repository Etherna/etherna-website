import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

import "./blog-header.scss"

const BlogHeader = ({ title, categories, activeSlug }) => {
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
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      locale: PropTypes.string.isRequired,
    }),
  ).isRequired,
  activeSlug: PropTypes.string,
}

export default BlogHeader
