import React from 'react'
import { useDispatch } from 'react-redux'
import { getId, createNotification, removeNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    const newAnecdote = await anecdoteService
      .createNew({
        content,
        votes: 0
      })

    dispatch(createAnecdote(newAnecdote))
    
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
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm