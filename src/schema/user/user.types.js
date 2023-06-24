const gql = require('graphql-tag')

const typeDefs = gql`
  type User {
    username: String!
    reviews: [Review!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    createUser (
      username: String!
      password: String!
    ): User

    login (
      username: String!
      password: String!
    ): Token
  }
`

module.exports = typeDefs
