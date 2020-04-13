import * as mongoose from 'mongoose'

export interface Token extends mongoose.Document {
  text: string,
  tokenSelected: string
}

const tokenSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  tokenSelected: {
    type: Number
  }
})

export const Token = mongoose.model<Token>('Token', tokenSchema)
