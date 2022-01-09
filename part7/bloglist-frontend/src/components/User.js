import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ id }) => {
  const user = useSelector(state => state.users.find(u => u.id === id))
  if (!user) return <div><p>loading...</p></div>

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        { user.blogs.map(blog =>
          <li key={blog.id}><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></li>
        ) }
      </ul>
    </div>
  )
}
export default User