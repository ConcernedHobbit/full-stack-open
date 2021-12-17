import React from 'react'
import { useDispatch } from 'react-redux'
import { getId, createNotification, removeNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    
    const notificationId = getId()
    dispatch(
      createNotification(
        `you created anecdote '${content}'`,
        notificationId,
        'notif-created'
      )
    )
    setTimeout(() => {
      dispatch(removeNotification(notificationId))
    }, 5 * 1000)
  }

  return (
    <div className='anecdote-form'>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm