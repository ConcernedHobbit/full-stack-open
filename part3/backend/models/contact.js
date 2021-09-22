const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const MONGO_URI = process.env.MONGODB_URI

console.log('connecting to', MONGO_URI)
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.error('error connecting to MongoDB')
        console.error(error.message)
    })

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8
    }
})
contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)
