const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: [true, 'Username must be unique.'],
    minlength: [4, 'Username must be at least 4 characters.']
  },
  favoriteGenre: {
    type: String,
    required: [true, 'Favorite genre is required.']
  }
})

module.exports = mongoose.model('User', schema)