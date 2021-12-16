const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const User = require ('../models/user')

describe('when there is initially one user in database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('übersekrz', 10)
        const root = new User({
            username: 'root',
            name: 'Superuser',
            passwordHash
        })

        await root.save()
    })

    test('login succeeds and returns valid token and details', async () => {
        const result = await api
            .post('/api/login')
            .send({
                'username': 'root',
                'password': 'übersekrz'
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body.token).toBeDefined()
        expect(result.body.username).toBe('root')
        expect(result.body.name).toBe('Superuser')

        const decodedToken = jwt.verify(result.body.token, process.env.SECRET)
        expect(decodedToken.username).toBe('root')
    })
})

afterAll(() => {
    mongoose.connection.close()
})