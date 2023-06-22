const { makeExecutableSchema } = require('@graphql-tools/schema')
const { mergeResolvers } = require('@graphql-tools/merge')

const gameSchema = require('./game')

const schema = makeExecutableSchema({
  typeDefs: [
    gameSchema.typeDefs
  ],
  resolvers: mergeResolvers(
    gameSchema.resolvers
  )
})

module.exports = schema
