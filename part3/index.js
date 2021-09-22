const { response } = require('express')
const express = require('express')
const app = express()

let contacts = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-5423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(contacts)
})

app.get('/api/persons/:id', (req, res) => {
    if (isNaN(req.params.id)) res.status(400).end()
    const id = Number(req.params.id)
    const note = contacts.find(contact => contact.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    if (isNaN(req.params.id)) res.status(400).end()
    const id = Number(req.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${contacts.length} people</p><p>${new Date()}</p>`);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

