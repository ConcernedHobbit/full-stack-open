import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async user => {
  const request = await axios.post(baseUrl, user)
  return request.data
}

const exports = { getAll, create }
export default exports