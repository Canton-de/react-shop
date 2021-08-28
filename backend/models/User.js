const { model, Schema, ObjectId } = require("mongoose");

const User = Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  type: { type: String, default: 'user' },
});

module.exports = model("User", User);
