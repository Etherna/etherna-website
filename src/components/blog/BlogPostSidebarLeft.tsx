import React from "react"
import { Link } from "gatsby"
import classNames from "@utils/classnames"

import classes from "@styles/components/blog/BlogPostSidebar.module.scss"

import ShareButtons from "./ShareButtons"
import Col from "@components/common/Col"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Post } from "@definitions/app"
import { useTranslations } from "@hooks/useTranslations"
import useLocaleInfo from "@hooks/useLocaleInfo"
import routes from "@utils/routes"

type BlogPostSidebarLeftProps = {
  post: Post
}

const BlogPostSidebarLeft: React.FC<BlogPostSidebarLeftProps> = ({ post }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "blog")
  const [localeInfo] = useLocaleInfo()
  const otherLangs = post.allSlugs.filter(s => s.locale !== post.locale)

  return (
    <Col as="aside" className={classNames(classes.blogSidebar, classes.blogSidebarLeft)}>
      {otherLangs.length > 0 && (
        <h6 className={classes.blogSidebarTitle}>{t`moreLanguages`}</h6>
      )}
      {otherLangs.map((slugInfo, i) => (
        <React.Fragment key={i}>
          <Link
            to={routes.blogPostPath(slugInfo.slug, slugInfo.locale)}
            className={classes.sidebarReadInBtn}
          >
            <img
              src={localeInfo(slugInfo.locale).flag.localFile.publicURL}
              className={classes.sidebarReadInFlag}
              alt=""
            />
            <span className={classes.sidebarReadInName}>
              {t("readIn", undefined, slugInfo.locale)} {localeInfo(slugInfo.locale).name}
            </span>
          </Link>

          <hr className="my-8" />
        </React.Fragment>
      ))}

      <h6 className={classes.blogSidebarTitle}>{t`sharePost`}</h6>
      <ShareButtons
        className="mb-16"
        url={typeof window !== "undefined" ? window.location.href : ""}
        title={post.title}
        vertical={true}
      />
    </Col>
  )
}

export default BlogPostSidebarLeft
