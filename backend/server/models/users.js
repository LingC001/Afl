import mongoose from 'mongoose'

const { Schema } = mongoose

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise

const userSchema = new Schema({
  name: String,
  type: {
    type: String,
    required: true,
  },
  account: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('User', userSchema)
