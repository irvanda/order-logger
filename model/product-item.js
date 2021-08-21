const mongoose = require('mongoose');

const ProductItemSchema = new mongoose.Schema({
  product: { type: Number },
  name: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model('product_item', ProductItemSchema);
