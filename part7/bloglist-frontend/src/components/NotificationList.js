import React from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'

const NotificationList = ({ amount }) => {
  const notifications = useSelector(
    state => state.notifications.sort((n1, n2) => n2.createdAt - n1.createdAt)
  )

  return (
    <div>
      {notifications.slice(0, amount || 5).map(notification =>
        <Notification key={notification.id} {...notification} />
      )}
    </div>
  )
}

export default NotificationList