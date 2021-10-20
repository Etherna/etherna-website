import React from "react"
import classNames from "classnames"

import Col from "@components/common/Col"
import classes from "@styles/components/blog/BlogPostSidebar.module.scss"

const BlogPostSidebarRight: React.FC = ({ }) => {
  return (
    <Col as="aside" className={classNames(classes.blogSidebar, classes.blogSidebarRight)}>
    </Col>
  )
}

export default BlogPostSidebarRight
