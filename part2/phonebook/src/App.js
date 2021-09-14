import React, { useState } from 'react'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter contacts by name: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Contact = ({contact}) => {
  return (
    <p>{contact.name} {contact.number}</p>
  )
}

const ContactList = ({contacts, filter}) => {
  return (
    <div>
      { 
        contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
                .map(contact => <Contact key={contact.name} contact={contact} />)
      }
    </div>
  )
}

const ContactForm = ({callback}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleCallback = (event) => {
    const success = callback({event, newName, newNumber})

    if (!success) return;
    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={(e) => handleCallback(e)}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '0118-999-88199-9119-725-3' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addContact = ({event, newName, newNumber}) => {
    event.preventDefault()

    const names = contacts.map((contact) => contact.name)
    if (names.includes(newName)) {
      alert(`${newName} is already in your contacts`)
      return false
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    setContacts(contacts.concat(newContact))
    return true
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add new contact</h2>
      <ContactForm callback={addContact} />

      <h2>Contacts</h2>
      <ContactList contacts={contacts} filter={filter} />
    </>
  )
}

export default App
