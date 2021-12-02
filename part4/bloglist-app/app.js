const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
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

app.use('/api/blogs', blogsRouter)

module.exports = app