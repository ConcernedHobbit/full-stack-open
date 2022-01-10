import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const SetBirthyear = () => {
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

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input value={name} onChange={({ target }) => setName(target.value)} />
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