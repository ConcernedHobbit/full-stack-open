import React, { useEffect, useState } from 'react'
import contactService from './services/contacts'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter contacts by name: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Contact = ({contact}) => <span>{contact.name} {contact.number}</span>

const ContactList = ({contacts, filter, setContacts}) => {
  const deleteContact = contact => {
    const confirmation = window.confirm(`Delete ${contact.name}?`)
    if (!confirmation) return;

    contactService
      .remove(contact.id)
      .then(response => {
        setContacts(
          contacts.filter(otherContact => otherContact.id !== contact.id)
        )
      })
      .catch(error => {
        console.error(error)
        alert(`Failed to delete contact from server`)
      })
  }

  return (
    <div>
      { 
        contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
                .map(contact => {
                  return (
                    <div key={contact.name}>
                      <Contact contact={contact} setContacts={setContacts} /> <button onClick={() => deleteContact(contact)}>delete</button>
                    </div>
                  )
                })
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
  const [contacts, setContacts] = useState([])
  
  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    contactService.getAll().then(data => setContacts(data))
  }, [])

  const addContact = ({event, newName, newNumber}) => {
    event.preventDefault()

    const newContact = {
      name: newName,
      number: newNumber
    }

    const names = contacts.map((contact) => contact.name)
    if (names.includes(newName)) {
      const confirmation = window.confirm(`${newName} is already in your contacts, replace the old number with a new one?`)
      if (!confirmation) return false;

      const contactId = contacts.find(contact => contact.name === newName).id

      contactService
        .update(contactId, newContact)
        .then(response => {
          setContacts(contacts.map(contact => contact.id === contactId ? response : contact))
        })
        .catch(error => {
          console.error(error)
          alert('Failed to update contact number')
          return false
        })
    } else {
      contactService
      .create(newContact)
      .then(response => {
        setContacts(contacts.concat(response))
        return true
      })
      .catch(error => {
        console.error(error)
        alert('Failed to add contact to database')
        return false
      })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add new contact</h2>
      <ContactForm callback={addContact} />

      <h2>Contacts</h2>
      <ContactList contacts={contacts} filter={filter} setContacts={setContacts} />
    </>
  )
}

export default App
