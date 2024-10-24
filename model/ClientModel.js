const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
  },
  email: {
    type: String,
    required: [true, "Please enter user email address"],
    unique: [true, "Please enter unique email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter user password"],
  },
role:{
    type: String,
    enum: ['admin','user','agent','agency'],
    required: true,
    default: 'user',
},
isVerified: { type: Boolean, default: false },
verificationToken: { type: String },
},
{
    timestamps : true,
},
);

module.exports = mongoose.model("User", userSchema);
