const mongoose = require('mongoose');

const UserLogSchema = new mongoose.Schema(
  {
    userId: { type: String },
    email: { type: String },
    role: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user_log', UserLogSchema);
