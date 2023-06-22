const gameResolvers = require('./game').resolvers

const resolvers = {
  Query: {
    ...gameResolvers.Query
  }
}

module.exports = resolvers
