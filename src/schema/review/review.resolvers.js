const Review = require('../../models/review')
const Game = require('../../models/game')
const dateResolver = require('../helpers/date')

const resolvers = {
  Query: {
    allReviews: async () => {
      return await Review.find({}).populate('game')
    }
  },
  Mutation: {
    addReview: async (root, args) => {
      const { title, content, username, score, gameId, timePlayed } = args
      const game = await Game.findById(gameId)
      if (!game) {
        console.log('Game does no exist')
        return null
      }

      const review = new Review({
        title,
        content,
        username,
        score,
        publishDate: new Date(),
        game: game._id,
        timePlayed
      })

      const savedReview = await review.save()
      game.reviews.push(savedReview._id)
      await game.save()
      return savedReview.populate('game', { reviews: 0 })
    }
  },
  Date: dateResolver
}

module.exports = resolvers
