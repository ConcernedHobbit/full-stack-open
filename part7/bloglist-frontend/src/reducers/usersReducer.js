import userService from '../services/users'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_USER':
    return state.concat(action.data)
  case 'REMOVE_USER':
    return state.filter(user => user.id !== action.data.id)
  case 'INIT_USERS':
    return action.data
  default: return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default reducer