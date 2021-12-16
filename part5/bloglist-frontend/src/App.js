import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

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

  const setInput = (setter) => (event) => {
    setter(event.currentTarget.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'logged_in', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
    }
  }

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogURL
      })

      setBlogs(blogs.concat(blog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogURL('')
    } catch (exception) {
      console.error(exception)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('logged_in')
    window.location.reload();
  }

  const loginForm = () => (
    <div>
      <h2>log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={setInput(setUsername)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={setInput(setPassword)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )


  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label>title</label>
          <input 
            type="text"
            name="Blog title"
            value={blogTitle}
            onChange={setInput(setBlogTitle)}
          />
        </div>
        <div>
          <label>author</label>
          <input 
            type="text" 
            name="Blog author" 
            value={blogAuthor}
            onChange={setInput(setBlogAuthor)}
          />
        </div>
        <div>
          <label>url</label>
          <input 
            type="text" 
            name="Blog URL" 
            value={blogURL}
            onChange={setInput(setBlogURL)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        logged in as {user.name}. <button onClick={logOut}>log out</button>
      </p>
      {blogForm()}
      {blogList()}
    </div>
  )
}

export default App