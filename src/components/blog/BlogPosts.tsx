import React from "react"

import classes from "@styles/components/blog/BlogPosts.module.scss"

import BlogPostPreview from "./BlogPostPreview"
import BlogHeader from "./BlogHeader"
import Breadcrumb from "@components/common/Breadcrumb"
import BreadcrumbItem from "@components/common/BreadcrumbItem"
import Container from "@components/common/Container"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Post } from "@definitions/app"
import { useTranslations } from "@hooks/useTranslations"
import Row from "@components/common/Row"
import Col from "@components/common/Col"

type BlogPostsProps = {
  title: string
  posts: Post[]
  activeSlug?: string
  breadcrumb: Array<{
    title: string
    path: string
  }>
}

const BlogPosts: React.FC<BlogPostsProps> = ({ title, posts, activeSlug, breadcrumb }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "blog")

  return (
    <>
      <BlogHeader
        title={title}
        activeSlug={activeSlug}
      />

      <section className={classes.blog}>
        <Container>
          <Row>
            <Col>
              {breadcrumb && (
                <Breadcrumb>
                  {breadcrumb.map((brItem, i) => (
                    <BreadcrumbItem
                      title={brItem.title}
                      path={brItem.path}
                      key={i}
                    />
                  ))}
                </Breadcrumb>
              )}
            </Col>
          </Row>
          <Row>
            <Col className="lg:w-3/4 xl:w-2/3">
              {posts.map((post, i) => (
                <BlogPostPreview
                  post={post}
                  key={i}
                />
              ))}

              {posts.length === 0 && (
                <div className="py-8 text-gray-700">
                  <h4>{t`noPosts`} <span role="img" aria-label="silence">🤫</span></h4>
                </div>
              )}
            </Col>
            <Col as="aside" className="lg:w-1/4 xl:w-1/3">
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default BlogPosts
