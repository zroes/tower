import mongoose from "mongoose"
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true },
    eventId: { type: Schema.Types.ObjectId, required: true },
    body: { type: String, required: true, maxLength: 2000, minLength: 5 }
  }, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: 'Account'
})