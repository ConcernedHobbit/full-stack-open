import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fromStorage, logOut } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import NotificationList from './components/NotificationList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(fromStorage())
  }, [])

  const handleLogOut = () => {
    dispatch(logOut())
  }

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
      <h2>blogs</h2>
      <NotificationList amount={1} />
      <p>
        logged in as {user.name}. <button onClick={handleLogOut}>log out</button>
      </p>
      <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggleable>
      <BlogList />
    </div>
  )
}

export default App