const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there are initially some blogs in database', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekritz', 10)
        const newUser = new User({
            'username': 'user',
            'name': 'Test User',
            'passwordHash': passwordHash
        })
        const user = await newUser.save()

        await Blog.insertMany(
            helper.createInitialBlogs(user._id)
        )
    })

    describe('and not logged in', () => {
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

        test('identifying field is called id and there is no _id', async () => {
            const res = await api.get('/api/blogs')
            expect(res.body[0].id).toBeDefined()
            expect(res.body[0]._id).not.toBeDefined()
        })

        test('a blog cannot be added', async () => {
            const newBlog = {
                title: 'Barty\'s best tips',
                author: 'Barty Fakeguy',
                url: 'https://bartystips.kdl',
                likes: 7
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/)

            const blogs = await helper.allBlogs()
            expect(blogs).toHaveLength(helper.initialBlogs.length)
        })

        test('a blog cannot be deleted', async () => {
            const blogsAtStart = await helper.allBlogs()
            const targetId = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${targetId}`)
                .expect(401)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.allBlogs()

            expect(blogsAtEnd).toHaveLength(
                blogsAtStart.length
            )
        })

        test('a blog cannot be updated', async () => {
            const blogsAtStart = await helper.allBlogs()
            const targetId = blogsAtStart[0]

            const updatedBlog = {
                title: 'Vandalism Global',
                url: 'https://hckrz.kfl',
                likes: 999
            }

            await api
                .patch(`/api/blogs/${targetId}`)
                .send(updatedBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.allBlogs()
            expect(blogsAtEnd).toHaveLength(
                blogsAtStart.length
            )

            const titles = blogsAtEnd.map(blog => blog.title)
            expect(titles).not.toContain('Vandalism Global')
        })

        test('a blog cannot be replaced', async () => {
            const blogsAtStart = await helper.allBlogs()
            const targetId = blogsAtStart[0]

            const newBlog = {
                title: 'Cracker News',
                url: 'https://news.xcombinator.fds',
                author: 'Anonymous',
                likes: 999
            }

            await api
                .put(`/api/blogs/${targetId}`)
                .send(newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.allBlogs()
            expect(blogsAtEnd).toHaveLength(
                blogsAtStart.length
            )

            const titles = blogsAtEnd.map(blog => blog.title)
            expect(titles).not.toContain('Cracker News')
        })
    })

    describe('and logged in', () => {
        beforeEach(async () => {
            const rootPasswordHash = await bcrypt.hash('übersekrit', 10)
            const rootUser = new User({
                'username': 'root',
                'passwordHash': rootPasswordHash
            })
            const root = await rootUser.save()

            const rootBlog = new Blog({
                'title': 'Root\'s Amazing Blog',
                'author': 'Samantha Groves',
                'url': 'https://poi.shw',
                'likes': 745,
                'user': root._id
            })
            const blog = await rootBlog.save()
            this.rootBlogId = blog._id

            const user = await User.findOne({ username: 'user' })

            this.userId = user._id
            this.token = 'bearer ' + jwt.sign(
                {
                    username: user.username,
                    id: user._id
                },
                process.env.SECRET
            )
        })

        test('a blog can be added', async () => {
            const blogsAtStart = await helper.allBlogs()

            const newBlog = {
                title: 'Barty\'s best tips',
                author: 'Barty Fakeguy',
                url: 'https://bartystips.kdl',
                likes: 7
            }

            await api
                .post('/api/blogs')
                .set('Authorization', this.token)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const res = await api.get('/api/blogs')
            expect(res.body).toHaveLength(
                blogsAtStart.length + 1
            )
        })

        test('the added blog has right content', async () => {
            const newBlog = {
                title: 'Firehoses and Hose Tips',
                author: 'Firefighter Jenny',
                url: 'https://hoses.klf',
                likes: 17
            }

            await api
                .post('/api/blogs')
                .set('Authorization', this.token)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogs = await helper.allBlogs()
            const titles = blogs.map(blog => blog.title)
            expect(titles).toContain(newBlog.title)
        })

        test('adding a blog without likes sets like to 0', async () => {
            const newBlog = {
                title: 'Firetrucks Fan Page',
                author: 'Driver Kayla',
                url: 'https://firetr.ucks'
            }

            await api
                .post('/api/blogs')
                .set('Authorization', this.token)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogs = await helper.allBlogs()
            const blog = blogs.find(blog => blog.title === 'Firetrucks Fan Page')
            expect(blog.likes).toBe(0)
        })

        test('adding blog without title and url responds with bad request and appropriate message', async () => {
            const newBlog = {
                author: 'Karth McIndecisive',
                likes: 3
            }

            const result = await api
                .post('/api/blogs')
                .set('Authorization', this.token)
                .send(newBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('must have')
            expect(result.body.error).toContain('title')
            expect(result.body.error).toContain('URL')
        })

        describe('own blogs', () => {
            test('can be deleted', async () => {
                const blogsAtStart = await helper.allBlogs()
                const toDelete = blogsAtStart.find(blog => blog.user.toString() === this.userId.toString())
                const id = toDelete.id

                await api
                    .delete(`/api/blogs/${id}`)
                    .set('Authorization', this.token)
                    .expect(204)

                const blogsAtEnd = await helper.allBlogs()

                expect(blogsAtEnd).toHaveLength(
                    blogsAtStart.length - 1
                )

                const titles = blogsAtEnd.map(blog => blog.title)
                expect(titles).not.toContain(toDelete.title)
            })

            test('can be updated', async () => {
                const blogsAtStart = await helper.allBlogs()
                const toUpdate = blogsAtStart.find(blog => blog.user.toString() === this.userId.toString())
                const id = toUpdate.id

                const updatedBlog = {
                    'title': 'Water Fan Club'
                }

                await api
                    .patch(`/api/blogs/${id}`)
                    .set('Authorization', this.token)
                    .send(updatedBlog)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)

                const blogsAtEnd = await helper.allBlogs()
                expect(blogsAtEnd).toHaveLength(
                    blogsAtStart.length
                )

                const blog = blogsAtEnd.find(blog => blog.id === id)
                expect(blog.title).toBe('Water Fan Club')
                expect(blog.author).toBe(toUpdate.author)
                expect(blog.url).toBe(toUpdate.url)
                expect(blog.likes).toBe(toUpdate.likes)
            })

            test('can be replaced', async () => {
                const blogsAtStart = await helper.allBlogs()
                const toUpdate = blogsAtStart.find(blog => blog.user.toString() === this.userId.toString())
                const id = toUpdate.id

                const newBlog = {
                    title: 'Firefighting Tips from a Pro',
                    author: 'Sergeant Fireperson',
                    url: 'https://fireprotips.gkj',
                    likes: 91
                }

                await api
                    .put(`/api/blogs/${id}`)
                    .set('Authorization', this.token)
                    .send(newBlog)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)

                const blogsAtEnd = await helper.allBlogs()
                expect(blogsAtEnd).toHaveLength(
                    blogsAtStart.length
                )

                const blog = blogsAtEnd.find(blog => blog.id === id)
                expect(blog.title).toBe(newBlog.title)
                expect(blog.author).toBe(newBlog.author)
                expect(blog.url).toBe(newBlog.url)
                expect(blog.likes).toBe(newBlog.likes)
            })
        })

        describe('others\' blogs', () => {
            test('cannot be deleted, and trying to do so returns forbidden with an appropriate message', async () => {
                const blogsAtStart = await helper.allBlogs()

                const result = await api
                    .delete(`/api/blogs/${this.rootBlogId.toString()}`)
                    .set('Authorization', this.token)
                    .expect(401)
                    .expect('Content-Type', /application\/json/)

                expect(result.body.error).toContain('cannot delete')

                const blogsAtEnd = await helper.allBlogs()

                expect(blogsAtEnd).toHaveLength(
                    blogsAtStart.length
                )
            })

            test('cannot be updated, and trying to do so returns forbidden with appropriate message', async () => {
                const blogsAtStart = await helper.allBlogs()

                const updatedBlog = {
                    title: 'Soda Hate Club'
                }

                const result = await api
                    .patch(`/api/blogs/${this.rootBlogId.toString()}`)
                    .set('Authorization', this.token)
                    .send(updatedBlog)
                    .expect(401)
                    .expect('Content-Type', /application\/json/)

                expect(result.body.error).toContain('cannot modify')

                const blogsAtEnd = await helper.allBlogs()

                expect(blogsAtEnd).toHaveLength(
                    blogsAtStart.length
                )

                const titles = blogsAtEnd.map(blog => blog.title)
                expect(titles).not.toContain('Soda Hate Club')
            })

            test('cannot be replaced, and trying to do so returns forbidden with appropriate message', async () => {
                const blogsAtStart = await helper.allBlogs()

                const newBlog = {
                    title: 'Hydrating Tips from a Noob',
                    author: 'Pog Unimportant',
                    url: 'https://hydratetips.gkj',
                    likes: 32
                }

                const result = await api
                    .put(`/api/blogs/${this.rootBlogId.toString()}`)
                    .set('Authorization', this.token)
                    .send(newBlog)
                    .expect(401)
                    .expect('Content-Type', /application\/json/)

                expect(result.body.error).toContain('cannot replace')

                const blogsAtEnd = await helper.allBlogs()

                expect(blogsAtEnd).toHaveLength(
                    blogsAtStart.length
                )

                const titles = blogsAtEnd.map(blog => blog.title)
                expect(titles).not.toContain('Hydrating Tips from a Noob')
            })
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})