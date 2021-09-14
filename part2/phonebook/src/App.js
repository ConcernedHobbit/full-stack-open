import React, { useState } from 'react'

const Contact = ({contact}) => {
  return (
    <p>{contact.name}</p>
  )
}

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()

    const newContact = {
      name: newName
    }

    setContacts(contacts.concat(newContact))
    setNewName('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Contacts</h2>
      { contacts.map((contact) => <Contact key={contact.name} contact={contact} />) }
    </>
  )
}

export default App
