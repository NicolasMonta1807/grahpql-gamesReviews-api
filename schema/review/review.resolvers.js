const Review = require('../../models/review')
const Game = require('../../models/game')
const User = require('../../models/user')
const dateResolver = require('../helpers/date')
const { GraphQLError } = require('graphql')

const resolvers = {
  Query: {
    allReviews: async () => {
      return await Review.find({}).populate('game')
    }
  },
  Mutation: {
    addReview: async (root, args, context) => {
      const { title, content, score, gameId, timePlayed } = args
      const { currentUser } = context

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const game = await Game.findById(gameId)
      if (!game) {
        throw new GraphQLError('Game not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.gameId
          }
        })
      }

      try {
        const user = await User.findById(currentUser.id)

        const review = new Review({
          title,
          content,
          user: user._id,
          score,
          publishDate: new Date(),
          game: game._id,
          timePlayed
        })

        const savedReview = await review.save()
        game.reviews.push(savedReview._id)
        user.reviews.push(savedReview._id)
        await game.save()
        await user.save()
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
