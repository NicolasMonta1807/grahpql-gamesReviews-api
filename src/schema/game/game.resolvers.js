const Game = require('../../models/game')
const dateResolver = require('../helpers/date')

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
      const game = new Game({ ...args })
      return await game.save()
    }
  },
  Date: dateResolver
}

module.exports = resolvers
