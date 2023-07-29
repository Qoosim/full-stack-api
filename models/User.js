const  mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please enter a username'],
    minlength: [3, 'Minimum username is 3 characters']
  },
  email: {
    type: String,
    require: [true, 'Please enter an email'],
    unique: true,
    lowerCase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    require: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
}, {timestamps: true });

// fire a function before doc save to the db
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next()
})

module.exports = mongoose.model('User', UserSchema);