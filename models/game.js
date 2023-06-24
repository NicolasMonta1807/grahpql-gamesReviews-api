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
  },
  reviews: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Review'
  }]
})

gameSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret.id
    delete ret.__v
  }
})

module.exports = mongoose.model('Game', gameSchema)
