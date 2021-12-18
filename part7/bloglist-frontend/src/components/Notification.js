import React from 'react'
import { useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = ({ message, id, level }) => {
  const dispatch = useDispatch()

  const remove = () => {
    dispatch(removeNotification(id))
  }

  const classes = level ? `notification ${level}` : 'notification'

  return (
    <div onClick={remove} className={classes}>
      {message}
    </div>
  )
}

export default Notification