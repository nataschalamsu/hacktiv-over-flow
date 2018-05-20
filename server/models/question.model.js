const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    title: String,
    question: {
      type: String,
      required: [true, 'question required']
    },
    tag: String,
    up: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    down: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    answers: [{
      type: Schema.Types.ObjectId,
      ref: 'answer'
    }]
  },
  {
    timestamps: true
  }
)

let question = mongoose.model('questions', questionSchema)

module.exports = question