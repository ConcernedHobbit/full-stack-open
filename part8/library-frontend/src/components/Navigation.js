import { useApolloClient } from '@apollo/client'
import React from 'react'

const CommonNavigation = ({ setPage }) => (
  <>
    <button onClick={() => setPage('authors')}>authors</button>
    <button onClick={() => setPage('books')}>books</button>
  </>
)

const Navigation = ({ setPage, setToken, loggedIn }) => {
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (!loggedIn) {
    return (
      <div>
        <CommonNavigation setPage={setPage} />
        <button onClick={() => setPage('login')}>login</button>  
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setPage('recommended')}>recommended</button>
      <CommonNavigation setPage={setPage} />
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={logout}>logout</button>  
    </div>
  )
}

export default Navigation