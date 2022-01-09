import React from 'react'

import NotificationList from './NotificationList'

import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'

import { Link } from 'react-router-dom'

const Header = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <header>
      <nav>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
        <span>
          logged in as {user.name}. <button onClick={handleLogOut}>log out</button>
        </span>
      </nav>
      <NotificationList amount={1} />
      <h1>blog app</h1>
    </header>
  )
}

export default Header