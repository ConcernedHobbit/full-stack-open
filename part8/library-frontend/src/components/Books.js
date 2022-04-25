import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES, BOOKS_BY_GENRE, BOOK_ADDED } from '../queries'
import BookList from './BookList'
import { updateCache } from '../util'

const FilterMenu = ({ filter, setFilter }) => {
  const style = {
    position: 'absolute',
    bottom: '1rem',
    display: 'flex',
    gap: '.25rem',
    flexWrap: 'wrap'
  }

  const [getGenres, result] = useLazyQuery(ALL_GENRES)

  useEffect(getGenres, [getGenres])

  useEffect(() => {
    if (filter === null) {
      getGenres()
    }
  }, [filter, getGenres]) 
  
  const genres = result.data?.allGenres

  if (!genres) {
    return <div style={style}>loading...</div>
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
  const allBooks = useQuery(ALL_BOOKS)
  const [getBooks, genreBooks] = useLazyQuery(BOOKS_BY_GENRE)
  const [filter, setFilter] = useState(null)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      props.flash(`${addedBook.title} was added to the catalogue`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  useEffect(() => {
    if (!filter) {
      // Refetch allBooks?
    } else {
      getBooks({ variables: { genre: filter } })
    }
  }, [filter, getBooks])

  if (!props.show) {
    return null
  }

  if (allBooks.loading || genreBooks.loading) {
    return (
      <div>
        <h2>books</h2>
        <p>loading...</p>

        <FilterMenu
        filter={filter}
        setFilter={setFilter} 
      />
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <BookList books={filter && genreBooks.data ? genreBooks.data.allBooks : allBooks.data.allBooks} />

      <FilterMenu
        filter={filter}
        setFilter={setFilter} 
      />
    </div>

  )
}

export default Books