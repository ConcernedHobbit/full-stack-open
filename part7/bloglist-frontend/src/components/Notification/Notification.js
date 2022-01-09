import React from 'react'
import { useDispatch } from 'react-redux'
import { removeNotification } from '../../reducers/notificationReducer'

const Notification = ({ message, id, level }) => {
  const dispatch = useDispatch()

  const remove = () => {
    dispatch(removeNotification(id))
  }

  const getClasses = () => {
    switch (level) {
    case 'success':
      return 'bg-green-100 border-green-600'
    case 'error':
      return 'bg-red-100 border-red-600'
    }
  }

  return (
    <div onClick={remove} className={`${getClasses()} absolute right-0 border rounded-sm w-max p-1 m-2 font-semibold cursor-pointer`}>
      {message}
    </div>
  )
}

export default Notification