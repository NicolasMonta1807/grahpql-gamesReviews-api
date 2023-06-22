const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  publisher: {
    type: String,
    required: true
  }
})

gameSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id
    delete doc._id
    delete doc.__v
  }
})

module.exports = mongoose.model('Game', gameSchema)
