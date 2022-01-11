import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const SetBirthyear = ({ names, setError }) => {
  const defaultYear = new Date().getFullYear() - 30
  const [name, setName] = useState('')
  const [born, setBorn] = useState(defaultYear)

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    update: (store, response) => {
      const storedData = store.readQuery({ query: ALL_AUTHORS })
      const responseData = response.data

      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...storedData,
          allAuthors: [ 
            ...storedData.allAuthors.filter(author => 
              author.id !== responseData.editAuthor.id), 
            responseData.editAuthor
          ]
        }
      })
    },
    onError: (error) => {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        setError(error.graphQLErrors[0].message)
      } else {
        setError(`${error}`)
      }
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    if (!name) {
      setError('Select an author to modify')
      return
    }

    editBirthyear({ variables: { name, year: parseInt(born) } })

    setName('')
    setBorn(defaultYear)
  }

  if (!names) {
    return null
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)} required>
            <option value=''>Select an option...</option>
            { names.map(name => (
              <option key={name} value={name}>{name}</option>
            )) }
          </select>
        </div>
        <div>
          born
          <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} required />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear