import React from 'react'
import userService from '../services/users'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createNotification } from '../reducers/notificationReducer'
import { addUser } from '../reducers/usersReducer'
import { useHistory } from 'react-router-dom'

const RegisterForm = () => {
  const name = useField('text', 'new-name')
  const username = useField('text', 'new-username')
  const password = useField('password', 'new-password')
  const history = useHistory()
  const dispatch = useDispatch()

  const submit = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.create({
        username: username.value,
        name: name.value,
        password: password.value
      })

      dispatch(addUser(
        user
      ))

      history.push('/login')
      name.reset()
      username.reset()
      password.reset()

      dispatch(createNotification({
        message: `user ${user.username} created`,
        level: 'success'
      }))

    } catch (exception) {
      dispatch(createNotification({
        message: 'failed to register',
        level: 'error'
      }))
    }
  }

  return (
    <div id='register-form' className="bg-white shadow-md rounded p-2">
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor={name.fields.name} className="block text-gray-700 text-sm font-bold mb-2">name</label>
          <input {...name.fields} required className="shadow border rounded-sm leading-tight focus:outline-none focus:shadow-outline text-gray-700" placeholder="Erkki Esimerkki" />
        </div>
        <div className="mb-3">
          <label htmlFor={username.fields.name} className="block text-gray-700 text-sm font-bold mb-2">username</label>
          <input {...username.fields} required className="shadow border rounded-sm leading-tight focus:outline-none focus:shadow-outline text-gray-700" placeholder="erkki.esimerkki" />
        </div>
        <div className="mb-3">
          <label htmlFor={password.fields.name} className="block text-gray-700 text-sm font-bold mb-2">password</label>
          <input {...password.fields} required className="shadow border rounded-sm leading-tight focus:outline-none focus:shadow-outline text-gray-700" placeholder="******************" />
        </div>
        <button id="register" type="submit" className="bg-violet-300 hover:bg-violet-500 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">register</button>
      </form>
    </div>
  )
}

export default RegisterForm