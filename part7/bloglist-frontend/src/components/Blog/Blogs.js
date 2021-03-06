import React from 'react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Toggleable from '../Toggleable'

const Blogs = ({ blogFormRef }) => (
  <div>
    <BlogList />
    <div className="pt-2">
      <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggleable>
    </div>
  </div>
)

export default Blogs