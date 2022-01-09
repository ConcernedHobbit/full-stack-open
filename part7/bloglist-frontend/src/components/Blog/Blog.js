import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../../reducers/blogReducer'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import CommentForm from '../CommentForm'

const Blog = ({ id }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blogs.find(b => b.id === id))

  if (!blog) return <i>blog not found</i>

  const like = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const remove = (event) => {
    event.preventDefault()
    if (window.confirm(`remove ${blog.title || blog.url} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
      history.push('/')
    }
  }

  const comments = blog.comments?.length > 0
    ? <ul className="list-['\1F4AC'] list-inside">{ blog.comments.map(comment => <li key={comment.id}>{comment}</li>) }</ul>
    : <i>no comments</i>

  return (
    <div>
      <div className="mb-3">
        <h2 className="text-2xl font-semibold">{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <p><span className="likes">{blog.likes}</span> likes <button onClick={like} className="border border-black bg-green-100 rounded-sm px-2">like</button></p>
        <p>added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></p>
        { blog.user.username === user.username && <button onClick={remove} className="h-8 text-sm bg-red-300 hover:bg-red-500 text-white font-bold mt-2 px-2 rounded focus:outline-none focus:shadow-outline">remove</button> }
      </div>
      <div>
        <h3 className="text-xl">comments</h3>
        <CommentForm blogId={id} />
        { comments }
      </div>
    </div>
  )
}

Blog.propTypes = {
  id: PropTypes.string.isRequired
}

export default Blog