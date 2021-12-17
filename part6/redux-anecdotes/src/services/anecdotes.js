import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {
  const anecdote = await get(id)
  const response = await axios.patch(`${baseUrl}/${id}`, {
    ...anecdote,
    votes: anecdote.votes + 1
  })
  return response.data
}

const exports = { getAll, get, createNew, vote }
export default exports