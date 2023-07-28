const  mongoose = require("mongoose");
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowerCase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    require: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
});

module.exports = mongoose.model('User', UserSchema);