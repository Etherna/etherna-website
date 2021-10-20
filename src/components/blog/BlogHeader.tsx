import React from "react"
import classNames from "classnames"
import { graphql, useStaticQuery, Link } from "gatsby"

import classes from "@styles/components/blog/BlogHeader.module.scss"

import useLocale from "@context/locale-context/hooks/useLocale"
import { CategoryNode } from "@definitions/sources"
import { parseCategories } from "@utils/dataParser"
import dayjs from "@utils/dayjs"
import routes from "@utils/routes"

type BlogHeaderProps = {
  title: string
  activeSlug?: string
}

type BlogHeaderStaticQuery = {
  categories: {
    nodes: Array<CategoryNode & {
      posts: Array<{
        published_on: string
      }>
    }>
  }
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, activeSlug }) => {
  const data = useStaticQuery<BlogHeaderStaticQuery>(graphql`
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
    n.posts.filter(p => dayjs(p.published_on).isBefore(dayjs())).length > 0
  )
  const categories = parseCategories(nodes, locale)

  return (
    <header className={classes.blogHeader}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className={classes.blogHeaderTitle}>{title}</h1>

            {categories.length > 0 && (
              <ul className={classes.blogHeaderCategories}>
                {categories.map((category, i) => (
                  <li
                    className={classes.blogHeaderCategoriesItem}
                    key={i}
                  >
                    <Link
                      to={routes.blogCategoryPath(category.slug, category.locale)}
                      className={classNames(classes.blogHeaderCategoriesLink, {
                        [classes.active]: category.slug === activeSlug
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

export default BlogHeader
