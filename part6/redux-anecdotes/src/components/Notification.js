import React from 'react'
import { useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = ({ message, id, className = '' }) => {
  const dispatch = useDispatch()
  const remove = () => {
    dispatch(removeNotification(id))
  }
  const classes = className ? `notification ${className}` : 'notification'

  return (
    <div onClick={remove} className={classes}>
      {message}
    </div>
  )
}

export default Notification