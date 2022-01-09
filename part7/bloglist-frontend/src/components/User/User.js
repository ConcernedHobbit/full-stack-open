import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserBlogs = ({ blogs }) => (
  <ul className="list-['\1F4DA'] list-inside">
    { blogs.map(blog =>
      <li key={blog.id}><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></li>
    ) }
  </ul>
)

const User = ({ id }) => {
  const user = useSelector(state => state.users.find(u => u.id === id))
  if (!user) return <i>user not found</i>

  return (
    <div>
      <h1 className="text-2xl font-semibold">{user.name}</h1>
      <h2 className="text-xl">added blogs</h2>
      {
        user.blogs.length > 0
          ? <UserBlogs blogs={user.blogs} />
          : <i>no blogs</i>
      }
    </div>
  )
}
export default User