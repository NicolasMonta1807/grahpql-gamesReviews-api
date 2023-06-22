const { mergeTypeDefs } = require('@graphql-tools/merge')

const gameTypeDefs = require('./game').typeDefs
const reviewTypeDefs = require('./review').typeDefs

const typeDefs = [
  gameTypeDefs,
  reviewTypeDefs
]

module.exports = mergeTypeDefs(typeDefs)
