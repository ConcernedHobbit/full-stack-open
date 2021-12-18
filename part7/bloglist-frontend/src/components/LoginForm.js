import React from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const dispatch = useDispatch()

  const login = (event) => {
    event.preventDefault()

    dispatch(logIn({
      username: username.value,
      password: password.value
    }))

    username.reset()
    password.reset()
  }

  return (
    <div id='login-form'>
      <h2>log in</h2>
      <form onSubmit={login}>
        <div>
          <label>username</label>
          <input {...username.fields} />
        </div>
        <div>
          <label>password</label>
          <input {...password.fields} />
        </div>
        <button id="log-in" type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm