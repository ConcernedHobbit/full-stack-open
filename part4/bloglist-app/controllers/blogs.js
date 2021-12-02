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

blogsRouter.patch('/:id', async (req, res) => {
    const body = req.body
    const updated = {}
    if (body.title) updated.title = body.title
    if (body.author) updated.author = body.author
    if (body.url) updated.url = body.url
    if (body.likes) updated.likes = body.likes
    
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        updated,
        { new: true }
    )
    res.status(200).json(updatedBlog)
})

module.exports = blogsRouter