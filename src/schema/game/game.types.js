const gql = require('graphql-tag')

const typeDefs = gql`
  scalar Date
  
  type Query {
    allGames: [Game!]!
    gamesCount: Int!
  }

  type Game {
    title: String!
    developer: String!
    publisher: String!
    releaseDate: Date!
    id: String!
  }

  type Mutation {
    addGame (
      title: String!
      developer: String!
      publisher: String!
      releaseDate: Date!
    ): Game!
  }
`

module.exports = typeDefs
