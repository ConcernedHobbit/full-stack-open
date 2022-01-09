import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserTable = ({ users }) => (
  <table>
    <thead>
      <tr>
        <th className="text-left">name</th>
        <th className="pl-4 text-left">blogs created</th>
      </tr>
    </thead>
    <tbody>
      { users.map(user => (
        <tr key={user.id}>
          <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
          <td className="pl-4">{user.blogs?.length || 0}</td>
        </tr>
      )) }
    </tbody>
  </table>
)

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2 className="text-xl">all users</h2>
      { users.length > 0 ? <UserTable users={users} /> : <i>no users</i> }
    </div>
  )
}

export default Users