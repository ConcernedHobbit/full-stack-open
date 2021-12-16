// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(b => b.likes).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    return blogs.sort((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const authors = {}
    blogs.forEach(blog => {
        authors[blog.author] = authors[blog.author] ? authors[blog.author] + 1 : 1
    })

    const mostBlogsAuthor = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)

    return {
        author: mostBlogsAuthor,
        blogs: authors[mostBlogsAuthor]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const authors = {}
    blogs.forEach(blog => {
        authors[blog.author] = authors[blog.author] ? authors[blog.author] + blog.likes : blog.likes
    })

    const mostLikesAuthor = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)

    return {
        author: mostLikesAuthor,
        likes: authors[mostLikesAuthor]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}