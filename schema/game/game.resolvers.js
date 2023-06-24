const Game = require('../../models/game')
const dateResolver = require('../helpers/date')
const { GraphQLError } = require('graphql')

const resolvers = {
  Query: {
    gamesCount: async () => {
      return await Game.collection.countDocuments()
    },
    allGames: async () => {
      return await Game.find({}).populate('reviews', { game: 0 })
    }
  },
  Mutation: {
    addGame: async (root, args) => {
      try {
        const game = new Game({ ...args })
        return await game.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          code: error.name
        })
      }
    }
  },
  Date: dateResolver
}

module.exports = resolvers
