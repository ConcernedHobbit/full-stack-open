import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, showRemoveButton, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    event.preventDefault()
    handleLike(blog)
  }

  const remove = (event) => {
    event.preventDefault()
    if (window.confirm(`remove ${blog.title || blog.url} by ${blog.author}?`)) {
      handleRemove(blog)
    }
  }

  const header = (
    <p onClick={toggleVisibility} className='clickable header'>
      <span className='title'>{blog.title || blog.url}</span> by <span className='author'>{blog.author}</span>
    </p>
  )

  if (visible) {
    return (
      <div className='blog opened'>
        {header}
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={like}>like</button></p>
        <p>{blog.user.name}</p>
        { showRemoveButton && <button onClick={remove}>remove</button> }
      </div>  
    )
  } else {
    return (
      <div className='blog closed'>
        {header}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool,
  handleRemove: PropTypes.func
}

export default Blog