import React from 'react'

const Notification = ({ message, className = '' }) => {
  const classes = className ? `notification ${className}` : 'notification'
  return (
    <div className={classes}>
      {message}
    </div>
  )
}

export default Notification