import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

import classes from "@styles/components/blog/BlogPostPreview.module.scss"

import Avatar from "@components/common/Avatar"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Post } from "@definitions/app"
import dayjs from "@utils/dayjs"
import routes from "@utils/routes"

type BlogPostPreviewProps = {
  post: Post
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ post }) => {
  const [locale] = useLocale()
  const formattedDate = dayjs(post.published_on).locale(locale)

  return (
    <article className={classes.postPreview}>
      <div className={classes.postPreviewDetails}>
        <header className={classes.postPreviewHeader}>
          {post.category && (
            <Link to={routes.blogCategoryPath(post.category.slug, locale)}>
              <div className={classes.postPreviewCategory}>
                {post.category.name}
              </div>
            </Link>
          )}
        </header>

        <Link to={routes.blogPostPath(post.slug, post.locale)}>
          <h2 className={classes.postPreviewTitle}>{post.title}</h2>
          <p className={classes.postPreviewExcerpt}>{post.excerpt}</p>
        </Link>

        <footer className={classes.postPreviewMeta}>
          <Avatar id={post.author.avatar} className={classes.postPreviewMetaAvatar} />
          <h4 className={classes.postPreviewMetaAuthorName}>
            {post.author.first_name} {post.author.last_name}
          </h4>
          <span className={classes.postPreviewMetaPublishTime}>
            {formattedDate.format("LL")}
          </span>
        </footer>
      </div>
      <div className={classes.postPreviewImage}>
        {post.image && (
          <Link to={routes.blogPostPath(post.slug, post.locale)}>
            <GatsbyImage image={post.image} objectFit="cover" alt="" />
          </Link>
        )}
      </div>
    </article>
  )
}

export default BlogPostPreview
