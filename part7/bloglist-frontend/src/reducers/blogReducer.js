import { createNotification } from './notificationReducer'
import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'UPDATE_BLOG': {
    const newState = state.filter(blog => blog.id !== action.data.id)
    return newState.concat(action.data)
  }
  case 'INIT_BLOGS':
    return action.data
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = ({ title, author, url }) => {
  return async dispatch => {
    try {
      const blog = await blogService.create({
        title,
        author,
        url
      })

      dispatch({
        type: 'ADD_BLOG',
        data: blog
      })

      dispatch(createNotification({
        message: `blog ${blog.title || blog.url} by ${blog.author} added`,
        level: 'success'
      }))
    } catch (exception) {
      dispatch(createNotification({
        message: 'failed to add blog',
        level: 'error'
      }))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update({
        id: blog.id,
        blog: {
          likes: blog.likes + 1
        }
      })

      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })

      dispatch(createNotification({
        message: `liked blog ${blog.title}`,
        level: 'success'
      }))
    } catch (exception) {
      dispatch(createNotification({
        message: 'failed to like blog',
        level: 'error'
      }))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)

      dispatch({
        type: 'REMOVE_BLOG',
        data: { id: blog.id }
      })

      dispatch(createNotification({
        message: `removed blog ${blog.title}`,
        level: 'success'
      }))
    } catch (exception) {
      dispatch(createNotification({
        message: 'failed to remove blog',
        level: 'error'
      }))
    }
  }
}

export default reducer