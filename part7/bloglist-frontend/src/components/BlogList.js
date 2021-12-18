import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  if (blogs.length === 0) {
    return (
      <div id='blogs'>
        <h2>all blogs</h2>
        <i>no blogs.</i>
      </div>
    )
  }

  return (
    <div id='blogs'>
      <h2>all blogs</h2>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default BlogList