import React from 'react'
import Notification from './Notification'
import { useSelector } from 'react-redux'

const NotificationList = () =>{
  const notifications = useSelector(state => state.notifications)

  return (
    <div>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          className={notification.className}
        />
      ))}
    </div>
  )
}

export default NotificationList
