const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.error('usage: node mongo.js [password] <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.zsaih.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

const addContact = (name, number) => {
    const contact = new Contact({ name, number })

    contact.save().then(res => {
        console.log(`added ${res.name} number ${res.number} to phonebook`)
        mongoose.connection.close()
        process.exit(0)
    })
}

if (process.argv.length > 5) {
    console.error('usage: node mongo.js [password] <name> <number>')
    process.exit(1)
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    addContact(name, number)
} else {
    console.log('phonebook:')
    Contact
        .find({})
        .then(contacts => {
            contacts.forEach(contact => {
                console.log(`${contact.name} ${contact.number}`)
            })
            mongoose.connection.close()
            process.exit(0)
        })
}