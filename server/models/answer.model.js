const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answersSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    answer: String,
    up: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    down: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }]
  },
  {
    timestamps: true
  }
)

let answer = mongoose.model('answer', answersSchema)

module.exports = answer