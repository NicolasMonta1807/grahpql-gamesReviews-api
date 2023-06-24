const gql = require('graphql-tag')

const typeDefs = gql`
  scalar Date

  type Query {
    allReviews: [Review!]!
  }

  type Review {
    title: String!
    content: String!
    user: User!
    score: Int!
    publishDate: Date!
    game: Game!
    timePlayed: Int
    id: String!
  }

  type Mutation {
    addReview (
      title: String!
      content: String!
      score: Int!
      gameId: String!
      timePlayed: Int
    ): Review
  }
`

module.exports = typeDefs
