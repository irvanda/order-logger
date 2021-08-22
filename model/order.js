const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    productItems: [
      {
        product: { type: Number },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
    total: { type: Number },
    createdBy: {
      name: { type: String },
      email: { type: String },
      role: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('order', OrderSchema);
