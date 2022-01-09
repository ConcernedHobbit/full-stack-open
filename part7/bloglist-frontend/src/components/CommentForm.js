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
      <form onSubmit={submit} className="flex items-center gap-2">
        <input {...comment.fields} className="my-2 h-8 text-sm shadow border rounded-sm leading-tight focus:outline-none focus:shadow-outline text-gray-700" placeholder="cool blog!" />
        <button type="submit" className="h-8 text-sm bg-violet-300 hover:bg-violet-500 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm