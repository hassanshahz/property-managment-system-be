// models/Agency.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving
agencySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password for login
agencySchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const Agency = mongoose.model('Agency', agencySchema);
module.exports = Agency;
