const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'token expired'
        })
    } else if (error.name === 'CastError') {
        return res.status(400).json({
            error: 'invalid value (probably id) in request'
        })
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (req, res, next) => {
    if (req.token) {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (decodedToken.id) {
            const user = await User.findById(decodedToken.id)
            req.user = user
        }
    }

    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}