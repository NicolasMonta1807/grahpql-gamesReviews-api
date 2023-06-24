const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')
const { SECRET } = require('../../middleware/config')

const resolvers = {
  Mutation: {
    createUser: async (root, args) => {
      const { username, password } = args
      try {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
          throw new Error('Username already exists')
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
          username,
          passwordHash
        })

        return newUser.save()
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`)
      }
    },
    login: async (root, args) => {
      const { username, password } = args
      const user = await User.findOne({ username })

      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

      if (!(user && passwordCorrect)) {
        throw new Error('Wrong credentials')
      }

      const userForToken = {
        username,
        id: user.id
      }

      return { value: jwt.sign(userForToken, SECRET) }
    }
  }
}

module.exports = resolvers
