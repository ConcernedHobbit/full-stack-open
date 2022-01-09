import userService from '../services/users'
import { createNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_USER':
    return state.concat(action.data)
  case 'REMOVE_USER':
    return state.filter(user => user.id !== action.data.id)
  case 'UPDATE_USER': {
    const newState = state.filter(user => user.id !== action.data.id)
    return newState.concat(action.data)
  }
  case 'INIT_USERS':
    return action.data
  default: return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: 'INIT_USERS',
        data: users
      })
    } catch (exception) {
      dispatch(createNotification({
        message: 'failed to load users',
        level: 'error'
      }))
    }
  }
}

export const updateById = (id) => {
  return async dispatch => {
    try {
      const user = await userService.getById(id)

      dispatch({
        type: 'UPDATE_USER',
        data: user
      })
    } catch (exception) {
      dispatch(createNotification({
        message: 'error connecting to server',
        level: 'error'
      }))
    }
  }
}

export const addUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_USER',
      data: user
    })
  }
}

export default reducer