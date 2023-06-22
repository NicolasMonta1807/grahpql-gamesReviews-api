const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const { MONGODB_URI, PORT } = require('./middleware/config')

const schema = require('./schema')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to database: ', error.message))

const server = new ApolloServer({ schema })

startStandaloneServer(server, {
  listen: { port: PORT }
}).then(({ url }) => console.log(`Server running at ${url}`))
