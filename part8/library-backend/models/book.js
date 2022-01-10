const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    unique: [true, 'Title must be unique.'],
    minlength: [2, 'Title must be at least 2 characters.']
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

module.exports = mongoose.model('Book', schema)