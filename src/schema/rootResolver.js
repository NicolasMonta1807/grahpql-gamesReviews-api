const gameResolvers = require('./game').resolvers
const reviewResolvers = require('./review').resolvers

const resolvers = {
  Query: {
    ...gameResolvers.Query,
    ...reviewResolvers.Query
  },
  Mutation: {
    ...gameResolvers.Mutation,
    ...reviewResolvers.Mutation
  }
}

module.exports = resolvers
