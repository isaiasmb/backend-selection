import * as mongoose from 'mongoose'

export interface Token extends mongoose.Document {
  text: string,
  tokenSelecteds: Array<Number>
}

const tokenSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  tokenSelecteds: {
    type: Array
  }
})

export const Token = mongoose.model<Token>('Token', tokenSchema)
