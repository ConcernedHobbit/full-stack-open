import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
      <ul>
        {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`} >
              {blog.title} {blog.author ? `by ${blog.author}` : ''}
            </Link>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default BlogList