const { mergeTypeDefs } = require('@graphql-tools/merge')

const gameTypeDefs = require('./game').typeDefs

const typeDefs = [
  gameTypeDefs
]

module.exports = mergeTypeDefs(typeDefs)
