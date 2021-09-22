const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(b => b.likes).reduce((a, b) => a + b, 0)
}

module.exports = {
    dummy,
    totalLikes
}