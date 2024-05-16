const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  subscriptionType: {
    type: String,
    enum: ['Premium', 'Standard']
  },
  profilePicture: {
    type: String
  },
  birthdate: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  }
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
