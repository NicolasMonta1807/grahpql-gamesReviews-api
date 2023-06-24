const Review = require('../../models/review')
const Game = require('../../models/game')
const dateResolver = require('../helpers/date')
const { GraphQLError } = require('graphql')

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
        throw new GraphQLError('Game not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.gameId
          }
        })
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

      try {
        const savedReview = await review.save()
        game.reviews.push(savedReview._id)
        await game.save()
        return savedReview.populate('game', { reviews: 0 })
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.name
          }
        })
      }
    }
  },
  Date: dateResolver
}

module.exports = resolvers
