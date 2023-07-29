const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', email: '', password: '' };

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = "that email already exist";
    return errors;
  }

  // Validate errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors;
}

// Signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    return res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
}

// Login
const login = async (req, res) => {
  if (req.body.email && req.body.password) {
  try {
        let user = await User.findOne({ email: req.body.email });
        if(user === null) return res.status(401).json("User no found!");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).json("Wrong password");
        const { password, createdAt, updatedAt, ...others } = user._doc;
        res.status(200).json(others);
      } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
      }
    } else {
      return res.status(401).json('Please, provide an email and password');
    }
}

module.exports = {
  signup,
  login
};