const gameResolvers = require('./game').resolvers
const reviewResolvers = require('./review').resolvers
const userResolvers = require('./user').resolvers

const resolvers = {
  Query: {
    ...gameResolvers.Query,
    ...reviewResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...gameResolvers.Mutation,
    ...reviewResolvers.Mutation,
    ...userResolvers.Mutation
  }
}

module.exports = resolvers
