const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const User = require('../models/user')
const { GraphQLError } = require('graphql')

const context = async ({ req, res }) => {
  const auth = req ? req.headers.authorization : null
  try {
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.split(' ')[1], SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('reviews')
      return { currentUser }
    }
  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: error.name
      }
    })
  }
}

module.exports = context
