import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { fromStorage } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

import Header from './components/Header'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import NotificationList from './components/NotificationList'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(fromStorage())
  }, [])

  const defaultMatch = { params: { id: '0' } }
  const userMatch = useRouteMatch('/users/:id') || defaultMatch
  const blogMatch = useRouteMatch('/blogs/:id') || defaultMatch

  if (!user.loggedIn) {
    return (
      <div>
        <NotificationList amount={1} />
        <LoginForm />
        <RegisterForm />
      </div>
    )
  }


  return (
    <div>
      <Header user={user} />
      <Switch>
        <Route path='/users/:id'>
          <User id={userMatch?.params.id} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog id={blogMatch?.params.id} />
        </Route>
        <Route path='/'>
          <Blogs blogFormRef={blogFormRef} />
        </Route>
      </Switch>
    </div>
  )
}

export default App