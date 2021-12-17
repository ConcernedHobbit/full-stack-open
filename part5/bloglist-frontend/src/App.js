import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('logged_in')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'logged_in', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setNotification(null)
    } catch (exception) {
      notify({
        message: 'failed to log in',
        level: 'error'
      })
    }
  }

  const createBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create({
        title,
        author,
        url
      })

      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()

      notify({
        message: `blog ${blog.title} by ${blog.author} added`,
        level: 'success'
      })
    } catch (exception) {
      notify({
        message: 'failed to add blog',
        level: 'error'
      })
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update({
        id: blog.id,
        blog: {
          likes: blog.likes + 1
        }
      })

      blogs.find(b => b.id === blog.id).likes = updatedBlog.likes

      notify({
        message: `liked blog ${blog.title}`,
        level: 'success'
      })

    } catch (exception) {
      notify({
        message: 'failed to like blog',
        level: 'error'
      })
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(
        blogs.filter(otherBlog => blog.id !== otherBlog.id)
      )

      notify({
        message: `removed blog ${blog.title}`,
        level: 'success'
      })

    } catch (exception) {
      notify({
        message: 'failed to remove blog',
        level: 'error'
      })
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('logged_in')
    setUser(null)

    notify({
      message: 'you have been logged out',
      level: 'success'
    })
  }

  const blogList = () => (
    <div className='blogs'>
      <h2>all blogs</h2>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          showRemoveButton={blog.user.username === user.username}
        />
      )}
    </div>
  )

  const notify = ({ message, level, timeout }) => {
    if (!message) return
    level = level || 'info'
    timeout = timeout || 5 * 1000

    setNotification({
      message,
      level
    })

    setTimeout(
      () => { setNotification(null) },
      timeout
    )
  }

  const notificationArea = () => {
    if (notification === null) return

    return (
      <div className={`notification ${notification.level}`}>
        {notification.message}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>log in</h2>
        {notificationArea()}
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notificationArea()}
      <p>
        logged in as {user.name}. <button onClick={logOut}>log out</button>
      </p>
      <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      {blogList()}
    </div>
  )
}

export default App