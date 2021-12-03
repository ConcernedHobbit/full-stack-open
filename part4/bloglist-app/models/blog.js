const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (_doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)