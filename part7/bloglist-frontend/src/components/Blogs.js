import React from 'react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'

const Blogs = ({ blogFormRef }) => (
  <div>
    <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm blogFormRef={blogFormRef} />
    </Toggleable>
    <BlogList />
  </div>
)

export default Blogs