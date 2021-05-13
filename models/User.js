const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    required: true,
    type: String,
  },
  email: {
    unique: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
