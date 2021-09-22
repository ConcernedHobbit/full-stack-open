require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const { response } = require('express')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

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

app.get('/api/persons', (req, res) => {
    Contact
        .find({})
        .then(contacts => {
            res.json(contacts)
        })
})

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id)
        .then(contact => {
            if (contact) {
                res.json(contact)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    Contact
        .count({}, (error, count) => {
            if (error) next(error)
            else {
                res.send(`<p>Phonebook has ${count} contacts</p><p>${new Date()}</p>`)
            }
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Contact
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const { name, number } = { ... body }
    const contact = { name, number }

    Contact
        .findByIdAndUpdate(req.params.id, contact, { new: true })
        .then(updatedContact => {
            res.json(updatedContact)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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

    contact
        .save()
        .then(savedContact => {
            res.json(savedContact.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({
            error: error.message
        })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

