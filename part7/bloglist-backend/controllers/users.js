const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs', { 'title': 1, 'url': 1, 'likes': 1 })
    res.status(200).json(
        users.map(user => user.toJSON())
    )
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User
        .findById(req.params.id)
        .populate('blogs', { 'title': 1, 'url': 1, 'likes': 1 })

    if (!user) res.status(404).json({
        error: 'user not found'
    })

    res.status(200).json(user.toJSON())
})

usersRouter.post('/', async (req, res) => {
    const body = req.body

    if (!body.username) {
        return res.status(400).json({
            error: 'user must have a username'
        })
    }

    if (!body.password || body.password.length < 3) {
        return res.status(400).json({
            error: 'user must have a password that is at least 3 characters long'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = usersRouter