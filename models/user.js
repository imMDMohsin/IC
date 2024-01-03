// models/user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Add a validation for email format if needed
  },
  subject : {
    type: String,
  },
  message : {
    type: String,
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
