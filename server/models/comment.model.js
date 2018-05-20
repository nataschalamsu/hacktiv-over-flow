const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    comment: String
  },
  {
    timestamps: true
  }
)

let comment = mongoose.model('comment', commentsSchema)

module.exports = comment