import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications.message)

  return (
    <div className='notification'>
      {notification}
    </div>
  )
}

export default Notification