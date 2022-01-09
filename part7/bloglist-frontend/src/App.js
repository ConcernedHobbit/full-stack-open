import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { fromStorage } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

import Header from './components/Header'
import Users from './components/User/Users'
import User from './components/User/User'
import Blogs from './components/Blog/Blogs'
import Blog from './components/Blog/Blog'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(fromStorage())
  }, [])

  const defaultMatch = { params: { id: '0' } }
  const userMatch = useRouteMatch('/users/:id') || defaultMatch
  const blogMatch = useRouteMatch('/blogs/:id') || defaultMatch

  return (
    <div className="bg-violet-50 h-screen">
      <Header/>
      <main className="p-2">
        <Switch>
          <Route path='/login'>
            <div className="flex items-end justify-center mt-40">
              <LoginForm />
            </div>
          </Route>
          <Route path='/register'>
            <div className="flex items-end justify-center mt-40">
              <RegisterForm />
            </div>
          </Route>
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
      </main>
    </div>
  )
}

export default App