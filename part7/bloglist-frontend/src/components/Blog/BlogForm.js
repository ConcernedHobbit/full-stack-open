import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { useField } from '../../hooks'

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
    <div id='blog-form' className="w-max bg-white shadow-md rounded p-2">
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor={title.fields.name} className="block text-gray-700 text-sm font-bold mb-2">title</label>
          <input {...title.fields} required className="shadow border rounded-sm leading-tight focus:outline-none focus:shadow-outline text-gray-700" placeholder="Adventures in Scotland"/>
        </div>
        <div className="mb-3">
          <label htmlFor={author.fields.name} className="block text-gray-700 text-sm font-bold mb-2">author</label>
          <input {...author.fields} className="shadow border rounded-sm leading-tight focus:outline-none focus:shadow-outline text-gray-700" placeholder="Jack Douglass"/>
        </div>
        <div className="mb-3">
          <label htmlFor={url.fields.name} className="block text-gray-700 text-sm font-bold mb-2">url</label>
          <input {...url.fields} className="shadow border rounded-sm leading-tight focus:outline-none focus:shadow-outline text-gray-700" placeholder="adventures.scot"/>
        </div>
        <button id="create-blog" type="submit" className="bg-green-300 hover:bg-green-500 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">create</button>
      </form>
    </div>
  )
}

export default BlogForm