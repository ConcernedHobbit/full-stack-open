const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs
}