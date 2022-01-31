import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AttendeeSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' }
},
    { timestamps: true, toJSON: { virtuals: true } })

AttendeeSchema.virtual('account', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})