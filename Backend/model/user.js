const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie', // This should match the name of your Movie model
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

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
  },
  favorites: [favoriteSchema] // Add favorites as an array of favoriteSchema
});




const Users = mongoose.model('users', userSchema);

module.exports = Users;
