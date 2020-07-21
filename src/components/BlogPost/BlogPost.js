import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Markdown } from "react-showdown"

import BlogPostHeader from "./BlogPostHeader"
import SEO from "@components/SEO"
import ShareButtons from "@components/ShareButtons"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"
import useLocaleInfo from "@utils/useLocaleInfo"
import routes from "@utils/routes"

import "./post.scss"
import Comments from "@components/Comments"

/**
 * @typedef {object} BlogPostProps
 * @property {import("@utils/dataParser").Post} post
 *
 * @param {BlogPostProps} param0
 */
const BlogPost = ({ post }) => {
  const [locale, { setLocalePath }] = useLocale()
  const trans = useTranslations(locale, "blog")
  const [localeInfo] = useLocaleInfo()
  const otherLangs = post.allSlugs.filter(s => s.locale !== post.locale)

  useEffect(() => {
    setLocalePaths()
    return () => clearLocalePaths()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocalePaths = () => {
    post.allSlugs.forEach(info => {
      setLocalePath(info.locale, routes.blogPostPath(info.slug, info.locale))
    })
  }

  const clearLocalePaths = () => {
    post.allSlugs.forEach(info => {
      setLocalePath(info.locale, undefined)
    })
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.meta_description || post.excerpt}
        keywords={post.meta_keywords}
      />

      <BlogPostHeader
        author={post.author}
        postTitle={post.title}
        category={post.category}
        image={post.image}
        published={post.published_on}
        updated={post.updated_on}
      />

      <div className="post">
        <div className="container">
          <div className="row">
            <aside className="col post-sidebar post-sidebar-left">
              {otherLangs.length > 0 && (
                <h6 className="post-sidebar-title">{trans("moreLanguages")}</h6>
              )}
              {otherLangs.map((slugInfo, i) => (
                <React.Fragment key={i}>
                  <Link
                    to={routes.blogPostPath(slugInfo.slug, slugInfo.locale)}
                    className="read-in-btn"
                  >
                    <img
                      src={localeInfo(slugInfo.locale).flag.localFile.publicURL}
                      className="read-in-flag"
                      alt=""
                    />
                    <span className="read-in-name">
                      {trans("readIn", null, slugInfo.locale)} {localeInfo(slugInfo.locale).name}
                    </span>
                  </Link>

                  <hr className="my-8" />
                </React.Fragment>
              ))}

              <h6 className="post-sidebar-title">{trans("sharePost")}</h6>
              <ShareButtons
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={post.title}
                vertical={true}
              />
            </aside>
            <article className="col post-content">
              <h1>{post.title}</h1>

              <Markdown markup={post.content} />

              <Comments postId={post.id} />
            </article>
            <aside className="col post-sidebar post-sidebar-right"></aside>
          </div>
        </div>
      </div>
    </>
  )
}

BlogPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    meta_description: PropTypes.string,
    meta_keywords: PropTypes.string,
    locale: PropTypes.string.isRequired,
    published_on: PropTypes.string.isRequired,
    updated_on: PropTypes.string,
    image: PropTypes.object,
    category: PropTypes.object,
    author: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      avatar: PropTypes.number,
    }).isRequired,
    allSlugs: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        locale: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
}

export default BlogPost
