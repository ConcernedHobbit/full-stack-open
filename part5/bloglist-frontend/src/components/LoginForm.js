import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handle = (setter) => (event) => {
    setter(event.currentTarget.value)
  }

  const login = (event) => {
    event.preventDefault()

    handleLogin({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div id='login-form'>
      <form onSubmit={login}>
        <div>
          <label>username</label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handle(setUsername)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handle(setPassword)}
          />
        </div>
        <button id="log-in" type="submit">log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm