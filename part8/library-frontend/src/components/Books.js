import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const FilterMenu = ({ genres, filter, setFilter }) => {
  if (!genres) {
    return null
  }

  const style = {
    position: 'absolute',
    bottom: '1rem',
    display: 'flex',
    gap: '.25rem',
    flexWrap: 'wrap'
  }

  return (
    <div style={style}>
      { genres.map(genre => (
        <button key={genre} disabled={filter === genre} onClick={() => setFilter(genre)}>{genre}</button>
      )) }
      { filter
        ? <button onClick={() => setFilter(null)}>all genres</button>
        : <button disabled>all genres</button>
      }
    </div>
  )
}

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>
        <h2>books</h2>
        <p>loading...</p>
      </div>
    )
  }

  const books = result.data.allBooks
  const genres = [
    ...new Set(
      books
        .map(book => book.genres)
        .reduce((assimilate, host) => host.concat(assimilate), [])    
    )
  ]

  const byGenre = (book) => filter ? book.genres.includes(filter) : true

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(byGenre).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <FilterMenu 
        genres={genres}
        filter={filter}
        setFilter={setFilter} 
      />
    </div>

  )
}

export default Books