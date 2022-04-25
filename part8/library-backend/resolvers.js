const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

require('dotenv').config()
const JWT_SECRET = process.env.SECRET

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    allBooks: (root, args) => {
      if (args.genre) return Book.find({ genres: args.genre })
      return Book.find({})
    },

    allAuthors: () => Author.find({}),

    allGenres: async () => {
      const books = await Book.find({}).select({ "genres": 1, "_id": 0 })
      return new Set(
        books
          .map(book => book.genres)
          .reduce((assimilate, host) => host.concat(assimilate), [])
      )
    },

    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),
    
    me: (root, args, context) => context.currentUser
  },

  Book: {
    author: (root) => Author.findById(root.author)
  },

  Author: {
    bookCount: (root) => Book.countDocuments({ author: root.id })
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      
      if (!author) {
        try {
          author = await new Author({ name: args.author }).save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args.author
          })
        }
      }

      try {
        const book = await Book({ ...args, author }).save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      let author = await Author.findOne({ name: args.name })
  
      if (!author) {
        throw new UserInputError('No such author', {
          invalidArgs: args.name
        })
      }
      
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args.setBornTo
        })
      }

      return author
    },

    createUser: async (root, args) => {
      try {
        const user = await new User({ ...args }).save()
        return user
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'pwd') {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
