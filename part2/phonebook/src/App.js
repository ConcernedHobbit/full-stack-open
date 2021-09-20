import React, { useEffect, useState } from 'react'
import contactService from './services/contacts'
import { ContactList, ContactForm } from './components/Contact'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter contacts by name: <input value={filter} onChange={handleFilterChange} />
    </div>
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
      if (!confirmation) return Promise.resolve(false);

      const contactId = contacts.find(contact => contact.name === newName).id

      return contactService
        .update(contactId, newContact)
        .then(response => {
          setContacts(contacts.map(contact => contact.id === contactId ? response : contact))
          return true
        })
        .catch(error => {
          console.error(error)
          alert('Failed to update contact number')
          return false
        })
    } else {
      return contactService
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
    <>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add new contact</h2>
      <ContactForm callback={addContact} />

      <h2>Contacts</h2>
      <ContactList contacts={contacts} filter={filter} setContacts={setContacts} deleteContact={deleteContact} />
    </>
  )
}

export default App
