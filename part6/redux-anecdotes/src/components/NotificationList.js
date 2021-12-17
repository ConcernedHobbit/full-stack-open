import React from 'react'
import Notification from './Notification'
import { connect } from 'react-redux'

const NotificationList = (props) =>{
  const notifications = props.notifications

  return (
    <div className='notifications'>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          className={notification.className}
          id={notification.id}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(
  mapStateToProps,
  null
)(NotificationList)
