const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_URI

console.log('connecting to', MONGO_URI)
mongoose.connect(MONGO_URI)
    .then(res => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.error('error connecting to MongoDB')
        console.error(error.message)
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

contactSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)
