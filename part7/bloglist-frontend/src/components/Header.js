import React from 'react'

import NotificationList from './Notification/NotificationList'

import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'

import { Link } from 'react-router-dom'

const UserText = () => {
  const user = useSelector(state => state.user)

  if (!user.loggedIn) return <></>

  return (
    <span>
      logged in as <Link to={`/users/${user.id}`} className="text-violet-800 underline">{user.name}</Link>.
    </span>
  )
}

const LogLink = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogOut = () => {
    dispatch(logOut())
  }

  if (!user.loggedIn) return (
    <div className="ml-auto">
      <Link to='/register' className="font-bold mr-2">register</Link>
      <Link to='/login' className="font-bold">log in</Link>
    </div>
  )

  return (
    <button onClick={handleLogOut} className="underline hover:text-gray-500 ml-auto font-bold">log out</button>
  )
}

const Header = () => {
  return (
    <header>
      <nav className="p-2 w-screen bg-violet-300 flex gap-4 items-center">
        <h1 className="text-xl">Blog App</h1>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
        <UserText />
        <LogLink />
      </nav>
      <NotificationList amount={1} />
    </header>
  )
}

export default Header