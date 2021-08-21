const mongoose = require('mongoose');

const UserLogSchema = new mongoose.Schema({
  productItems: [
    {
      product: { type: Number },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
  total: { type: Number },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    name: { type: String },
    email: { type: String },
    role: { type: Number },
  },
});

module.exports = mongoose.model('order', UserSchema);
