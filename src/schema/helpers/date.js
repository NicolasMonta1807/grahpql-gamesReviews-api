const { GraphQLScalarType } = require('graphql')

const dateResolver = new GraphQLScalarType({
  name: 'Date',
  parseValue: (value) => {
    return new Date(value)
  },
  serialize: (value) => {
    return value.toLocaleDateString()
  }
})

module.exports = dateResolver
