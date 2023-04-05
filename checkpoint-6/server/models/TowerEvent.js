import mongoose from "mongoose"
const Schema = mongoose.Schema

export const TowerEventSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, minLength: 3, maxLength: 200 },
    description: { type: String, maxLength: 1000 },
    coverImg: { type: String, maxLength: 500 },
    location: { type: String, maxLength: 500 },
    capacity: { type: Number, min: 0 },
    startDate: { type: Date, }, // probably don't want people to schedule events in the past? min: Date.now 
    isCanceled: { type: Boolean, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
  }, { timestamps: true, toJSON: { virtuals: true } })