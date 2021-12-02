const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require ('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('get /api/blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of blogs are returned', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(
            helper.initialBlogs.length
        )
    })

    test('identifying field is called id', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].id).toBeDefined()
    })

    test('blog does not have _id field', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0]._id).not.toBeDefined()
    })
})

describe('post /api/blogs', () => {
    test('blog can be added', async () => {
        await Blog.create({
            title: 'Barty\'s best tips',
            author: 'Barty Fakeguy',
            url: 'https://bartystips.kdl',
            likes: 7
        })

        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(
            helper.initialBlogs.length + 1
        )
    })

    test('added blog has right content', async () => {
        const newBlog = {
            title: 'Firehoses and Hose Tips',
            author: 'Firefighter Jenny',
            url: 'https://hoses.klf',
            likes: 17
        }

        await Blog.create(newBlog)

        const blogs = await helper.allBlogs()
        const titles = blogs.map(blog => blog.title)
        expect(titles).toContain(newBlog.title)
    })

    test('adding blog without likes sets likes to 0', async () => {
        const newBlog = {
            title: 'Firetrucks Fan Page',
            author: 'Driver Kayla',
            url: 'https://firetr.ucks'
        }

        await Blog.create(newBlog)

        const blog = await Blog.findOne({title: 'Firetrucks Fan Page'})
        expect(blog.likes).toBe(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
})