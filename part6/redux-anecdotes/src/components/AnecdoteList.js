import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer' 
import { getId, createNotification, removeNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(
      anecdote => 
      anecdote.content
        .toLowerCase()
        .includes(state.filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const content = anecdotes.find(anecdote => anecdote.id === id).content
    const notificationId = getId()
    dispatch(
      createNotification(
        `you voted for '${content}'`,
        notificationId,
        'notif-voted'
      )
    )
    setTimeout(() => {
      dispatch(removeNotification(notificationId))
    }, 5 * 1000)
  }

  if (anecdotes.length === 0) {
    return (
      <div className='anecdotes'>
        <i>an empty list is as useful as your imagination</i>
      </div>
    )
  }

  return (
    <div className='anecdotes'>
      {anecdotes
        .sort((a1, a2) => a2.votes - a1.votes)
        .map(anecdote =>
          <div key={anecdote.id} className='anecdote'>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList