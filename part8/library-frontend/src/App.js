import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const flashError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const flashInfo = (message) => {
    setInfoMessage(message)
    setTimeout(() => setInfoMessage(null), 5000)
  }

  return (
    <div>
      <Navigation 
        setPage={setPage}
        setToken={setToken}
        loggedIn={token !== null}
      />

      <Notification message={errorMessage} />
      <Notification message={infoMessage} color='blue' />

      <Recommended 
        show={page === 'recommended'}
      />

      <Authors
        show={page === 'authors'}
        setError={flashError}
        loggedIn={token !== null}
      />

      <Books
        show={page === 'books'}
        flash={flashInfo}
      />

      <NewBook
        show={page === 'add'}
        setError={flashError}
      />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setError={flashError}
      />
    </div>
  )
}

export default App