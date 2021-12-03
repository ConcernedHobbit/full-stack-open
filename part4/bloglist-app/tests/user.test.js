const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require ('../models/user')

describe('when there is initially one user in database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('übersekrz', 10)
        const root = new User({
            username: 'root',
            passwordHash
        })

        await root.save()
    })

    test('creation succeeds with unique username', async () => {
        const usersAtStart = await helper.allUsers()

        const newUser = {
            username: 'chobbit',
            name: 'Eetu Raunio',
            password: 'myFavouritePassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.allUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails if username already exists', async () => {
        const usersAtStart = await helper.allUsers()

        const newUser = {
            username: 'root',
            name: 'admin',
            password: 'inferiorPassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.allUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if username is missing', async () => {
        const usersAtStart = await helper.allUsers()

        const newUser = {
            name: 'User',
            password: 'xavier'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('must have a username')

        const usersAtEnd = await helper.allUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is missing', async () => {
        const usersAtStart = await helper.allUsers()

        const newUser = {
            username: 'user',
            name: 'User'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('must have a password')

        const usersAtEnd = await helper.allUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is shorter than 3 characters', async () => {
        const usersAtStart = await helper.allUsers()

        const newUser = {
            username: 'user',
            name: 'User',
            password: 'x'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('at least 3 characters long')

        const usersAtEnd = await helper.allUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})