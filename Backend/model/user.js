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
  role: {
    type: String,
    required: true
  },
  history: {
    type: Array,
    required: true
  },
  favorites: {
    type: Array,
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
