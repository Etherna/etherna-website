import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import classNames from "classnames"
import moment from "moment"

import classes from "@styles/components/blog/BlogPostHeader.module.scss"

import Avatar from "@components/common/Avatar"
import Breadcrumb from "@components/common/Breadcrumb"
import BreadcrumbItem from "@components/common/BreadcrumbItem"
import useLocale from "@context/locale-context/hooks/useLocale"
import { AuthorNode, GatsbyImageData } from "@definitions/sources"
import { Category } from "@definitions/app"
import { useTranslations } from "@hooks/useTranslations"
import routes from "@utils/routes"

type BlogPostHeaderProps = {
  author: AuthorNode
  postTitle: string
  image: GatsbyImageData | null
  published: string
  updated: string
  category: Category
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ author, postTitle, image, published, updated, category }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "blog")

  const publishedDate = moment(published).locale(locale)
  const updatedDate = updated ? moment(updated).locale(locale) : null

  return (
    <header className={classNames(classes.postHeader, {
      [classes.postHeaderHero]: image != null
    })}>
      {image && image.placeholder && (
        <div className={classes.postHeaderBg}>
          <div
            className={classes.postHeaderBgImage}
            style={{ backgroundImage: `url(${image.placeholder.fallback})` }}
          />
        </div>
      )}

      <div className={classes.postHeaderNav}>
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

      <div className={classes.postHeaderMeta}>
        <Avatar id={author.avatar} />
        <h4 className={classes.postHeaderMetaAuthorName}>{author.first_name} {author.last_name}</h4>

        <div className={classes.postHeaderMetaPublishTime}>
          {publishedDate.format("LL")}

          {updatedDate && (
            <>
              <span> – </span>
              <span className="text-gray-800">{t`updated`} {updatedDate.format("LL")}</span>
            </>
          )}
        </div>

        {category && (
          <Link to={routes.blogCategoryPath(category.slug, locale)}>
            <div className={classes.postHeaderMetaPostCategory}>
              {category.name}
            </div>
          </Link>
        )}

        <div className={classes.postHeaderMetaThumbnail}>
          {image && (
            <GatsbyImage image={image} objectFit="cover" alt="" />
          )}
        </div>
      </div>
    </header>
  )
}

export default BlogPostHeader
