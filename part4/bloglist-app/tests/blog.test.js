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

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

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

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const blogs = await helper.allBlogs()
        const blog = blogs.find(blog => blog.title === 'Firetrucks Fan Page')
        expect(blog.likes).toBe(0)
    })

    test('adding blog without title and url responds with bad request', async () => {
        const newBlog = {
            author: 'Karth McIndecisive',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('delete /api/blogs/:id', () => {
    test('blog can be deleted', async () => {
        const blogsAtStart = await helper.allBlogs()
        const toDelete = blogsAtStart[0]
        const id = toDelete.id

        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)

        const blogsAtEnd = await helper.allBlogs()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(toDelete.title)
    })
})

describe('patch /api/blogs/:id', () => {
    test('blog can be updated', async () => {
        const blogsAtStart = await helper.allBlogs()
        const toUpdate = blogsAtStart[0]
        const id = toUpdate.id
        const newLikes = toUpdate.likes + 10

        await api
            .patch(`/api/blogs/${id}`)
            .send({
                likes: newLikes
            })
            .expect(200)

        const blogsAtEnd = await helper.allBlogs()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length
        )

        const blog = blogsAtEnd.find(blog => blog.id === id)
        expect(blog.title).toBe(toUpdate.title)
        expect(blog.author).toBe(toUpdate.author)
        expect(blog.likes).toBe(newLikes)
        expect(blog.url).toBe(toUpdate.url)
    })
})

afterAll(() => {
    mongoose.connection.close()
})