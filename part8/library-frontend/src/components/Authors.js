import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import SetBirthyear from './SetBirthyear'

const Authors = ({ show, loggedIn, setError }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }
  
  if (result.loading) {
    return (
      <div>
        <h2>authors</h2>
        <p>loading...</p>
      </div>
    )
  }

  const alphabetically = (a, b) => a.name.localeCompare(b.name)
  const authors = [...result.data.allAuthors].sort(alphabetically)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              name
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      { 
        loggedIn
        ? <SetBirthyear 
          names={authors.map(author => author.name)}
          setError={setError}
        />
        : null
      }
    </div>
  )
}

export default Authors