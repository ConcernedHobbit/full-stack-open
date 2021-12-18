import React from 'react'
import userService from '../services/users'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createNotification } from '../reducers/notificationReducer'

const RegisterForm = () => {
  const name = useField('text', 'new-name')
  const username = useField('text', 'new-username')
  const password = useField('password', 'new-password')
  const dispatch = useDispatch()

  const submit = async (event) => {
    event.preventDefault()

    name.reset()
    username.reset()
    password.reset()

    try {
      const user = await userService.create({
        username: username.value,
        name: name.value,
        password: password.value
      })

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
    <div id='register-form'>
      <h2>register</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor={name.fields.name}>name</label>
          <input {...name.fields} />
        </div>
        <div>
          <label htmlFor={username.fields.name}>username</label>
          <input {...username.fields} />
        </div>
        <div>
          <label htmlFor={password.fields.name}>password</label>
          <input {...password.fields} />
        </div>
        <button id="register" type="submit">register</button>
      </form>
    </div>
  )
}

export default RegisterForm