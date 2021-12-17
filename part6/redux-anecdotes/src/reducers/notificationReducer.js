export const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return state.concat(action.data)
    case 'REMOVE_NOTIFICATION':
      return state.filter(anecdote => anecdote.id !== action.data.id)
    default: return state
  }
}

export const createNotification = (message, id = getId(), className) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      message,
      id,
      className
    }
  }
}

export const removeNotification = (id) => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: {
      id
    }
  }
}

export default reducer