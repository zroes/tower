import mongoose from "mongoose"
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, required: true },
    accountId: { type: Schema.Types.ObjectId, required: true },

  }, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
  localField: "accountId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})

TicketSchema.virtual('event', {
  localField: "eventId",
  foreignField: "_id",
  justOne: true,
  ref: "TowerEvent"
})