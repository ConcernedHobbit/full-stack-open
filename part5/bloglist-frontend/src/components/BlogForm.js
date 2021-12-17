import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handle = (setter) => (event) => {
    setter(event.currentTarget.value)
  }

  const submit = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div id='blog-form'>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="blog-title">title</label>
          <input
            id="blog-title"
            type="text"
            name="Blog title"
            value={title}
            onChange={handle(setTitle)}
          />
        </div>
        <div>
          <label htmlFor="blog-author">author</label>
          <input
            id="blog-author"
            type="text"
            name="Blog author"
            value={author}
            onChange={handle(setAuthor)}
          />
        </div>
        <div>
          <label htmlFor="blog-url">url</label>
          <input
            id="blog-url"
            type="text"
            name="Blog URL"
            value={url}
            onChange={handle(setURL)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm