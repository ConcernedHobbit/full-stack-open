import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { CURRENT_USER, BOOKS_BY_GENRE } from '../queries'
import BookList from './BookList'

const Recommended = ({ show }) => {
  const [getBooks, bookResult] = useLazyQuery(BOOKS_BY_GENRE)
  const [books, setBooks] = useState(null)
  const result = useQuery(CURRENT_USER)

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks)
    }
  }, [bookResult.data]) // eslint-disable-line

  useEffect(() => {
    if (result.data && result.data.me) {
      getBooks({ variables: { genre: result.data.me.favoriteGenre } })
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  if (result.loading || !books) {
    return (
      <div>
        <h2>recommendations</h2>
        <p>loading...</p>
      </div>
    ) 
  }

  const favouriteGenre = result.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favouriteGenre}</strong></p>

      <BookList books={books} />
    </div>
  )
}

export default Recommended