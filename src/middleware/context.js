const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const User = require('../models/user')

const context = async ({ req, res }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.startsWith('Bearer ')) {
    const decodedToken = jwt.verify(
      auth.split(' ')[1], SECRET
    )
    const currentUser = await User.findById(decodedToken.id).populate('reviews')
    return { currentUser }
  }
}

module.exports = context
