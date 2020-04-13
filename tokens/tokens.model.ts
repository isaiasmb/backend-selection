import * as mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  text: {
    type: String
  },
  tokenSelected: {
    type: Number
  }
})

export const Token = mongoose.model('Token', tokenSchema)
