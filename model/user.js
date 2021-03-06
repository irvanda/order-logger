const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  role: { type: Number },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model('user', UserSchema);
