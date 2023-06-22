const Game = require('../../models/game')
const dateResolver = require('../helpers/date')

const resolvers = {
  Query: {
    gamesCount: async () => {
      return await Game.collection.countDocuments()
    },
    allGames: async () => {
      return await Game.find({})
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
