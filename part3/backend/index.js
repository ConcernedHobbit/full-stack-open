const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', req => JSON.stringify(req.body))

app.use(
    morgan(
        'tiny', 
        { skip: (req, res) => req.method === 'POST' }
    )
)

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body',
        { skip: (req, res) => req.method !== 'POST' }
    )
)

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
    if (isNaN(req.params.id)) {
        return res.status(400).json({
            error: 'id should be number'
        })
    }

    const id = Number(req.params.id)
    const note = contacts.find(contact => contact.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        return res.status(400).json({
            error: 'id should be number'
        })
    }

    const id = Number(req.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name)  {
        return res.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const nameExists = contacts.some(contact => contact.name === body.name)
    if (nameExists) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const contact = {
        id: (Math.random() * Number.MAX_SAFE_INTEGER),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(contact)
    res.json(contact)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${contacts.length} people</p><p>${new Date()}</p>`);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

