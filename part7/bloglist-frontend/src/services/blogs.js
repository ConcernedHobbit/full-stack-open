import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const config = () => (
  {
    headers: { Authorization: token }
  }
)

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const request = await axios.post(baseUrl, blog, config())
  return request.data
}

const update = async ({ id, blog }) => {
  const request = await axios.patch(`${baseUrl}/${id}`, blog, config())
  return request.data
}

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, config())
  return request.data
}

const comment = async ({ id, comment }) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.data
}

const exports = { setToken, getAll, create, update, remove, comment }
export default exports