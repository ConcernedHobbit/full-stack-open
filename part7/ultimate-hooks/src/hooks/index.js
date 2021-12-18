import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const fields = {
    type,
    value,
    onChange
  }

  return {
    type,
    value,
    onChange,
    fields,
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const request = axios.get(baseUrl)
    request.then(response => {
      setResources(response.data)
    })
  }, [])

  const create = (resource) => {
    axios.post(baseUrl, resource).then(response => {
      setResources(resources.concat(response.data))
    })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}