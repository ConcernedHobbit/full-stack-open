import React from 'react'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    props.createAnecdote(content)
    
    props.createNotification({
      message: `you created anecdote '${content}'`,
      className: 'notif-created'
    })
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

export default connect(
  null,
  { createNotification, createAnecdote }
)
(AnecdoteForm)