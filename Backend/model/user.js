const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true
  },

  email: {
      type:String,
      required: true
  },

  password: {
      type: String,
      required: true
  },

  resetPasswordToken: {
    type: String,
    required: false
  },

  resetPasswordExpires: {
      type: Date,
      required: false
  },

  otp: {
      type: String,
      required: false
  },

  otpExpiry: {
      type: Date,
      required: false
  },

  role: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String
  },
  phone_num: {
    type: String
  },
  birthdate: {
    type: Date
  },
  gender: {
    type: String
  }
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
