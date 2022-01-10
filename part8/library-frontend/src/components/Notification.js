import React from 'react'

const Notification = ({ message, color = 'red' }) => {
  if (!message) {
    return null
  }

  const style = { 
    color: color,
    borderColor: color, 
    padding: '.25rem',
    margin: '.25rem',
    border: '1px solid',
    width: 'max-content'
  }

  return <p style={style}>{message}</p>
}

export default Notification