import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogForm = ({ blogFormRef }) => {
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')
  const dispatch = useDispatch()

  const submit = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    }))

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div id='blog-form'>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor={title.fields.name}>title</label>
          <input {...title.fields} />
        </div>
        <div>
          <label htmlFor={author.fields.name}>author</label>
          <input {...author.fields} />
        </div>
        <div>
          <label htmlFor={url.fields.name}>url</label>
          <input {...url.fields} />
        </div>
        <button id="create-blog" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm