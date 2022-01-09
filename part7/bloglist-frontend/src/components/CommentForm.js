import React from 'react'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ blogId }) => {
  const comment = useField('text', 'comment')
  const dispatch = useDispatch()
  const history = useHistory()

  const submit = (event) => {
    event.preventDefault()

    history.push(`/blogs/${blogId}`)
    dispatch(addComment(blogId, comment.value))

    comment.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input {...comment.fields} />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm