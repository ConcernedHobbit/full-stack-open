import React from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const dispatch = useDispatch()
  const history = useHistory()

  const login = (event) => {
    event.preventDefault()

    dispatch(logIn({
      username: username.value,
      password: password.value,
      history
    }))

    username.reset()
    password.reset()
  }

  return (
    <div id='login-form' className="bg-white shadow-md rounded p-2 w-max">
      <form onSubmit={login}>
        <div className="mb-3">
          <label htmlFor={username.fields.id} className="block text-gray-700 text-sm font-bold mb-2">username</label>
          <input {...username.fields} required className="shadow border rounded-sm leading-tight focus:outline-none focus:shadow-outline text-gray-700" placeholder="erkki.esimerkki" />
        </div>
        <div className="mb-3">
          <label htmlFor={password.fields.id} className="block text-gray-700 text-sm font-bold mb-2">password</label>
          <input {...password.fields} required className="shadow border rounded-sm leading-tight focus:outline-none focus:shadow-outline text-gray-700" placeholder="******************"/>
        </div>
        <button id="log-in" type="submit" className="bg-violet-300 hover:bg-violet-500 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">log in</button>
      </form>
    </div>
  )
}

export default LoginForm