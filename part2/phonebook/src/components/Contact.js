import { useState } from 'react'

const Contact = ({contact}) => <span>{contact.name} {contact.number}</span>

const ContactList = ({contacts, filter, setContacts, deleteContact}) => {
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
    callback({event, newName, newNumber})
        .then(success => {
            if (!success) return;
            setNewName('')
            setNewNumber('')
        })
  }

  return (
    <form onSubmit={(e) => handleCallback(e)}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default Contact
export { Contact, ContactList, ContactForm }