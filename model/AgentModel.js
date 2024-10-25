// models/Agent.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const agentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);
