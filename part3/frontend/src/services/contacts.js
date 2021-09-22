import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newContact => {
    const request = axios.post(baseURL, newContact)
    return request.then(response => response.data)
}

const update = (id, newContact) => {
    console.error(`contacts.update not implemented`)
    return Promise.reject()
    const request = axios.put(`${baseURL}/${id}`, newContact)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request
}

export default { getAll, create, update, remove }