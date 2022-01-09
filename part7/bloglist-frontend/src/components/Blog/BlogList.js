import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => (
  <ul className="list-['\1F4DA'] list-inside">
    {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog => (
      <li key={blog.id}>
        <Link to={`/blogs/${blog.id}`} >
          {blog.title}
        </Link> {blog.author ? `by ${blog.author}` : ''}
      </li>
    )) }
  </ul>
)

const Wrapper = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div id='blogs'>
      <h2 className="text-xl">all blogs</h2>
      { blogs.length > 0 ? <BlogList blogs={blogs} /> : <i>no blogs</i> }
    </div>
  )
}

export default Wrapper