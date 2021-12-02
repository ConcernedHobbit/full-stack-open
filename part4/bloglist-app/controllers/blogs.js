const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    if (!req.body.title && !req.body.url) {
        res
            .status(400)
            .json({
                error: 'Blog must have either a title or an URL'
            })
    } else {
        const blog = new Blog(req.body)

        const result = await blog.save()
        res.status(201).json(result)
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = blogsRouter