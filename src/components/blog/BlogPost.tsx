import React, { useEffect } from "react"

import classes from "@styles/components/blog/BlogPost.module.scss"

import BlogPostHeader from "./BlogPostHeader"
import BlogPostFooter from "./BlogPostFooter"
import BlogPostSchema from "./BlogPostSchema"
import BlogPostSidebarLeft from "./BlogPostSidebarLeft"
import BlogPostSidebarRight from "./BlogPostSidebarRight"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import Markdown from "@components/common/Markdown"
import HeadMeta from "@components/layout/HeadMeta"
import Prose from "@components/common/Prose"
import useLocale from "@context/locale-context/hooks/useLocale"
import routes from "@utils/routes"
import { Post } from "@definitions/app"
import { parseGatsbyImageSource } from "@utils/dataParser"

type BlogPostProps = {
  post: Post
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const [, { setLocalePath }] = useLocale()

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
      <HeadMeta
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

      <Prose className={classes.post}>
        <Container>
          <Row>
            <BlogPostSidebarLeft post={post} />

            <Col as="article" className={classes.postContent}>
              <h1 className={classes.postTitle}>{post.title}</h1>

              <Markdown rawMarkdown={post.content} />

              {/* <Comments postId={post.id} /> */}

              <BlogPostFooter />

              <BlogPostSchema
                author={post.author}
                title={post.title}
                image={parseGatsbyImageSource(post.image)}
                url={routes.blogPostPath(post.slug, post.locale)}
                excerpt={post.excerpt}
                content={post.content}
                keywords={post.meta_keywords}
                lang={post.locale}
                publishDate={post.published_on}
                updateDate={post.updated_on}
              />
            </Col>

            <BlogPostSidebarRight />
          </Row>
        </Container>
      </Prose>
    </>
  )
}

export default BlogPost
