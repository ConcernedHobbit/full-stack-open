const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})

module.exports = blogsRouter