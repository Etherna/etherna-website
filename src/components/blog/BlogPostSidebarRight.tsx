import React from "react"
import classNames from "classnames"

import classes from "@styles/components/blog/BlogPostSidebar.module.scss"

const BlogPostSidebarRight: React.FC = ({ }) => {
  return (
    <aside className={classNames("col", classes.blogSidebar, classes.blogSidebarRight)}>
    </aside>
  )
}

export default BlogPostSidebarRight
