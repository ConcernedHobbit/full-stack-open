import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    event.preventDefault()
    handleLike(blog)
  }

  if (visible) {
    return (
      <div className='blog opened'>
        <p onClick={toggleVisibility} className='clickable header'>
          <span className='title'>{blog.title}</span> by <span className='author'>{blog.author}</span> 
        </p>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={like}>like</button></p>
        <p>{blog.user.name}</p>
      </div>  
    )
  } else {
    return (
      <div className='blog closed'>
        <p onClick={toggleVisibility} className='clickable header'>
          <span className='title'>{blog.title}</span> by <span className='author'>{blog.author}</span> 
        </p>
      </div>
    )
  }
}

export default Blog