const mongoose = require('mongoose');

const UserLogSchema = new mongoose.Schema({
  userId: { type: String },
  email: { type: String },
  role: { type: Number },
  createdAt: { type: Number },
});

module.exports = mongoose.model('user_log', UserSchema);
