import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const fields = {
    type,
    name,
    id: name,
    value,
    onChange
  }

  return {
    type,
    name,
    value,
    fields,
    reset
  }
}