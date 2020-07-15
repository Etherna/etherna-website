import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Markdown } from "react-showdown"

import BlogPostHeader from "./BlogPostHeader"
import ShareButtons from "@components/ShareButtons"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"
import Routes from "@utils/routes"
import useLocaleInfo from "@utils/useLocaleInfo"

import "./post.scss"

/**
 * @typedef {object} BlogPostProps
 * @property {import("@utils/dataParser").Post} post
 *
 * @param {BlogPostProps} param0
 */
const BlogPost = ({ post }) => {
  const [
    locale, {
      switchLocale,
      setLocalePath
    }
  ] = useLocale()
  const trans = useTranslations(locale, "post")
  const [localeInfo] = useLocaleInfo()
  const otherLangs = post.allSlugs.filter(s => s.locale !== locale)

  useEffect(() => {
    if (post.locale !== locale) {
      switchLocale(post.locale)
    }

    setLocalePaths()

    return () => clearLocalePaths()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocalePaths = () => {
    post.allSlugs.forEach(info => {
      setLocalePath(info.locale, Routes.blogPostPath(info.slug))
    })
  }

  const clearLocalePaths = () => {
    post.allSlugs.forEach(info => {
      setLocalePath(info.locale, undefined)
    })
  }

  return (
    <>
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
              {otherLangs.length && (
                <h6 className="post-sidebar-title">{trans("moreLanguages")}</h6>
              )}
              {otherLangs.map((slugInfo, i) => (
                <>
                  <Link
                    to={Routes.blogPostPath(slugInfo.slug)}
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
                </>
              ))}

              <h6 className="post-sidebar-title">Share this post</h6>
              <ShareButtons
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={post.title}
                vertical={true}
              />
            </aside>
            <article className="col post-content">
              <Markdown markup={post.content} />
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
    excerpt: PropTypes.string.isRequired,
    meta_description: PropTypes.string.isRequired,
    meta_keywords: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    published_on: PropTypes.string.isRequired,
    updated_on: PropTypes.string,
    image: PropTypes.object,
    category: PropTypes.object,
    author: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      avatar: PropTypes.object,
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
