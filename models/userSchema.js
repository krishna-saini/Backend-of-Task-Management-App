const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "email is requireed"],
    unique: true,
  },
  token: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
