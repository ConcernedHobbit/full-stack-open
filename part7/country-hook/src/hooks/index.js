import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
      axios.get(`https://restcountries.com/v2/name/${name}`).then(response => {
        if (!response.data.status) {
          setCountry({
            data: response.data[0],
            found: true
          })
        } else {
          setCountry({
            data: null,
            found: false
          })
        }
      }).catch(exception => {
        setCountry({
          data: null,
          found: false
        })
      })
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}