const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  meetingTime: { type: Date, required: true },
  googleMeetLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);
