import { Schema } from 'mongoose'

export const TodoSchema = new Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
{ timestamps: true, toJSON: { virtuals: true } })

TodoSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
