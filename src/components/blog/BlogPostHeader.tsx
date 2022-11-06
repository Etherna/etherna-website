import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import classNames from "@utils/classnames"

import classes from "@styles/components/blog/BlogPostHeader.module.scss"

import Avatar from "@components/common/Avatar"
import Breadcrumb from "@components/common/Breadcrumb"
import BreadcrumbItem from "@components/common/BreadcrumbItem"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import useLocale from "@context/locale-context/hooks/useLocale"
import { AuthorNode, GatsbyImageData } from "@definitions/sources"
import { Category } from "@definitions/app"
import { useTranslations } from "@hooks/useTranslations"
import dayjs from "@utils/dayjs"
import routes from "@utils/routes"

type BlogPostHeaderProps = {
  author: AuthorNode
  postTitle: string
  image: GatsbyImageData | null
  published: string
  updated: string
  category: Category | null
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ author, postTitle, image, published, updated, category }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "blog")

  const publishedDate = dayjs(published).locale(locale)
  const updatedDate = updated ? dayjs(updated).locale(locale) : null

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
        <Container>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </Container>
      </div>

      <div className={classes.postHeaderMeta}>
        <Avatar className={classes.postHeaderMetaAvatar} id={author.avatar} />
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
