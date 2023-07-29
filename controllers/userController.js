const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get a user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// Update user
const updateUser = async (req, res) => {
  if (req.params.id && !req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
       return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
      return res.status(200).json("Account updated successfully.");
    } catch (err) {
     return res.status(500).json(err);
    }
  }
}

// Delete a user
const deleteUser = async (req, res) => {
  if (req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("Account deleted successfully!");
    } catch (error) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json("You can delete only your account!");
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser
};