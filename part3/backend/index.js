require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const { response } = require('express')

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
    Contact
        .find({})
        .then(contacts => {
            res.json(contacts)
        })
})

app.get('/api/persons/:id', (req, res) => {
    Contact.findById(req.params.id)
        .then(contact => {
            res.json(contact)
        })
        .catch(error => {
            console.log(error)
            res.status(404).end()
        })
})

app.delete('/api/persons/:id', (req, res) => {
    // Not implemented
    res.status(501).end()
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

    let { name, number } = { ... body }
    const contact = new Contact({ name, number })

    contact.save().then(res => {
        console.log(`added ${res.name} number ${res.number} to phonebook`)
    })

    contacts = contacts.concat(contact)
    res.json(contact)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${contacts.length} people</p><p>${new Date()}</p>`);
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

