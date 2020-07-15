import React from "react"
import PropTypes from "prop-types"

import BlogPostPreview from "@components/BlogPostPreview"
import BlogHeader from "@components/BlogHeader"

import "./blog.scss"

const BlogPosts = ({ title, posts, categories }) => {
  return (
    <>
      <BlogHeader
        title={title}
        categories={categories}
      />
      <section className="blog">
        <div className="container">
          <div className="row">
            <div className="col lg:w-3/4 xl:w-2/3">
              {posts.map((post, i) => (
                <BlogPostPreview
                  post={post}
                  key={i}
                />
              ))}
            </div>
            <aside className="col lg:w-1/4 xl:w-1/3">

            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

BlogPosts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
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
    })
  ).isRequired,
}

export default BlogPosts
