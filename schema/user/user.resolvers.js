const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')
const { SECRET } = require('../../middleware/config')
const { GraphQLError } = require('graphql')

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const { username, password } = args
      const existingUser = await User.findOne({ username })

      if (existingUser) {
        throw new GraphQLError('Username already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username
          }
        })
      }

      try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
          username,
          passwordHash
        })
        return newUser.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.name
          }
        })
      }
    },
    login: async (root, args) => {
      const { username, password } = args
      const user = await User.findOne({ username })

      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

      if (!(user && passwordCorrect)) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        const userForToken = {
          username,
          id: user.id
        }
        return { value: jwt.sign(userForToken, SECRET) }
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.name
          }
        })
      }
    }
  }
}

module.exports = resolvers
