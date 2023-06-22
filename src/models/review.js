const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    minLength: 20
  },
  username: {
    type: String,
    required: true,
    minLengt: 6
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  publishDate: {
    type: Date,
    required: true
  },
  game: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Game'
  },
  timePlayed: {
    type: Number
  }
})

reviewSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret.id
    delete ret.__v
  }
})

module.exports = mongoose.model('Review', reviewSchema)
