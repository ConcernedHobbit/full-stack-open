const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Everything and More',
        author: 'Lazarov Kharuzav',
        url: 'https://everything.cao',
        likes: 3
    },
    {
        title: 'The Guide to Your Backyard',
        author: 'Greenthumb McPerson',
        url: 'https://backyard.bek',
        likes: 47
    },
    {
        title: 'The Great Lakes Blog',
        author: 'Livesin Alake',
        url: 'https://fishperson.xk',
        likes: 0
    }
]

const createInitialBlogs = id => {
    const userBlogs = [...initialBlogs]
    userBlogs.forEach(blog => blog.user = id)
    return userBlogs
}

const allBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const allUsers = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    createInitialBlogs,
    allBlogs,
    allUsers,
}