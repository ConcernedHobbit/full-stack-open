const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const app = express()

logger.info('Connecting to MongoDB @ ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB database')
    })
    .catch(error => {
        logger.error('Error while connecting to MongoDB database', error)
    })

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app