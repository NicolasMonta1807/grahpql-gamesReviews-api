const { mergeTypeDefs } = require('@graphql-tools/merge')

const gameTypeDefs = require('./game').typeDefs
const reviewTypeDefs = require('./review').typeDefs
const userTypeDefs = require('./user').typeDefs

const typeDefs = [
  gameTypeDefs,
  reviewTypeDefs,
  userTypeDefs
]

module.exports = mergeTypeDefs(typeDefs)
