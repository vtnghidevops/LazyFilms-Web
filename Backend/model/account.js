const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    }
});

const Account = mongoose.model("Account", UserSchema, "Account");
module.exports = Account;