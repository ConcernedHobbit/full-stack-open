import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const SetBirthyear = ({ names }) => {
  const defaultYear = new Date().getFullYear() - 30
  const [name, setName] = useState('')
  const [born, setBorn] = useState(defaultYear)

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()

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
          <select value={name} onChange={({ target }) => setName(target.value) }>
            { names.map(name => (
              <option key={name} value={name}>{name}</option>
            )) }
          </select>
        </div>
        <div>
          born
          <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear