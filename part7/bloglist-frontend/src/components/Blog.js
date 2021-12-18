import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const remove = (event) => {
    event.preventDefault()
    if (window.confirm(`remove ${blog.title || blog.url} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const header = (
    <p onClick={toggleVisibility} className='clickable header'>
      <span className='title'>{blog.title || blog.url}</span> by <span className='author'>{blog.author}</span>
    </p>
  )

  if (!visible) {
    return (
      <div className='blog closed'>
        {header}
      </div>
    )
  }

  return (
    <div className='blog opened'>
      {header}
      <p>{blog.url}</p>
      <p><span className="likes">{blog.likes}</span> likes <button onClick={like}>like</button></p>
      <p>{blog.user.name}</p>
      { blog.user.username === user.username && <button onClick={remove}>remove</button> }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemove: PropTypes.func
}

export default Blog