const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    unique: [true, 'Name must be unique.'],
    minlength: [4, 'Name must be at least 4 characters.']
  },
  born: {
    type: Number,
  },
})

module.exports = mongoose.model('Author', schema)