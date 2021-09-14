import React, { useState } from 'react'

const Contact = ({contact}) => {
  return (
    <p>{contact.name} {contact.number}</p>
  )
}

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '0118-999-88199-9119-725-3' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addContact = (event) => {
    event.preventDefault()

    const names = contacts.map((contact) => contact.name)
    if (names.includes(newName)) {
      alert(`${newName} is already in your contacts`)
      return
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    setContacts(contacts.concat(newContact))
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Contacts</h2>
      { contacts.map((contact) => <Contact key={contact.name} contact={contact} />) }
    </>
  )
}

export default App
