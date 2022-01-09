import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'

const Blog = ({ id }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blogs.find(b => b.id === id))

  if (!blog) return <div><p>loading...</p></div>

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

  const comments = blog.comments?.length > 0
    ? <ul>{ blog.comments.map(comment => <li key={comment.id}>{comment}</li>) }</ul>
    : <i>no comments</i>

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p><span className="likes">{blog.likes}</span> likes <button onClick={like}>like</button></p>
      <p>added by {blog.user.name}</p>
      { blog.user.username === user.username && <button onClick={remove}>remove</button> }

      <h3>comments</h3>
      <CommentForm blogId={id} />
      { comments }
    </div>
  )
}

Blog.propTypes = {
  id: PropTypes.string.isRequired
}

export default Blog