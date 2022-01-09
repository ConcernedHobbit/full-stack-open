const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_req, res) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    if (!req.user) {
        return res
            .status(401)
            .json({
                error: 'token missing or invalid'
            })
    }

    const body = req.body

    if (!body.title && !body.url) {
        return res
            .status(400)
            .json({
                error: 'blog must have either a title or an URL'
            })
    }

    const user = req.user

    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    }

    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)

    await user.save()

    await savedBlog.populate('user', { username: 1, name: 1 })
    res.status(201).json(savedBlog.toJSON())

})

blogsRouter.post('/:id/comments', async (req, res) => {
    // if (!req.user) {
    //     return res
    //         .status(401)
    //         .json({
    //             error: 'token missing or invalid'
    //         })
    // }

    const body = req.body
    if (!body.comment) {
        return res
            .status(400)
            .json({
                error: 'no comment provided'
            })
    }

    const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: body.comment } }
    )
    if (!blog) {
        return res
            .status(404)
            .json({
                error: 'no blog found'
            })
    }

    res.status(201).json({ comment: body.comment })
})

blogsRouter.delete('/:id', async (req, res) => {
    if (!req.user) {
        return res
            .status(401)
            .json({
                error: 'token missing or invalid'
            })
    }

    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        return res
            .status(404)
            .json({
                error: 'no blog found'
            })
    }

    if (blog.user?.toString() !== req.user.id.toString()) {
        return res
            .status(401)
            .json({
                error: 'cannot delete a blog you do not own'
            })
    }

    await blog.delete()
    res.status(204).end()
})

blogsRouter.patch('/:id', async (req, res) => {
    if (!req.user) {
        return res
            .status(401)
            .json({
                error: 'token missing or invalid'
            })
    }

    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        return res
            .status(404)
            .json({
                error: 'no blog found'
            })
    }

    const body = req.body

    if ((body.title || body.author || body.url) && blog.user?.toString() !== req.user.id.toString()) {
        return res
            .status(401)
            .json({
                error: 'cannot modify a blog you do not own'
            })
    }

    if (body.title) blog.title = body.title
    if (body.author) blog.author = body.author
    if (body.url) blog.url = body.url
    if (body.likes) blog.likes = body.likes

    const updatedBlog = await blog.save()
    await updatedBlog.populate('user', { username: 1, name: 1 })
    res.status(200).json(updatedBlog.toJSON())
})

blogsRouter.put('/:id', async (req, res) => {
    if (!req.user) {
        return res
            .status(401)
            .json({
                error: 'token missing or invalid'
            })
    }

    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        return res
            .status(404)
            .json({
                error: 'no blog found'
            })
    }

    if (blog.user?.toString() !== req.user.id.toString()) {
        return res
            .status(401)
            .json({
                error: 'cannot replace a blog you do not own'
            })
    }

    const body = req.body
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findOneAndUpdate(
        req.params.id,
        newBlog,
        { new: true }
    )

    await updatedBlog.populate('user', { username: 1, name: 1 })
    res.status(200).json(updatedBlog)
})

module.exports = blogsRouter