import { createNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return action.data
  case 'LOG_OUT':
    return initialState
  default: return state
  }
}

export const fromStorage = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('logged_in')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOG_IN',
        data: {
          ...user,
          loggedIn: true
        }
      })
    }
  }
}

export const logIn = ({ username, password, history }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('logged_in', JSON.stringify(user))
      blogService.setToken(user.token)
      history.push('/')

      dispatch({
        type: 'LOG_IN',
        data: {
          ...user,
          loggedIn: true
        }
      })
    } catch (exception) {
      dispatch(createNotification({
        message: 'failed to log in',
        level: 'error'
      }))
    }
  }
}

export const logOut = () => {
  return dispatch => {
    window.localStorage.removeItem('logged_in')

    dispatch({
      type: 'LOG_OUT'
    })

    dispatch(createNotification({
      message: 'you have been logged out',
      level: 'success'
    }))
  }
}

export default reducer