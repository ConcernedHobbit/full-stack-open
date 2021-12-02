const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app');
const api = supertest(app);

const Blog = require ('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
})

test('correct amount of blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(
        helper.initialBlogs.length
    )
})

afterAll(() => {
    mongoose.connection.close()
})